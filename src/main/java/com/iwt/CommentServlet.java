package com.iwt;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

@WebServlet("/api/comments")
public class CommentServlet extends HttpServlet {

    private static final String SELECT_SQL =
            "SELECT id, poi_id, author, body, created_at FROM comments " +
            "WHERE poi_id = ? ORDER BY created_at DESC";

    private static final String INSERT_SQL =
            "INSERT INTO comments (poi_id, author, body) VALUES (?, ?, ?) " +
            "RETURNING id, created_at";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String poiId = req.getParameter("poiId");
        if (poiId == null || poiId.isBlank()) {
            writeError(resp, HttpServletResponse.SC_BAD_REQUEST, "poiId is required");
            return;
        }

        JSONArray out = new JSONArray();
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_SQL)) {
            ps.setString(1, poiId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    JSONObject row = new JSONObject();
                    row.put("id", rs.getInt("id"));
                    row.put("poiId", rs.getString("poi_id"));
                    row.put("author", rs.getString("author"));
                    row.put("body", rs.getString("body"));
                    row.put("createdAt", rs.getTimestamp("created_at").toInstant().toString());
                    out.put(row);
                }
            }
        } catch (SQLException e) {
            log("Error reading comments", e);
            writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Database error");
            return;
        }

        writeJson(resp, HttpServletResponse.SC_OK, out.toString());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JSONObject body;
        try {
            body = new JSONObject(new JSONTokener(req.getReader()));
        } catch (Exception e) {
            writeError(resp, HttpServletResponse.SC_BAD_REQUEST, "Invalid JSON");
            return;
        }

        String poiId = body.optString("poiId", "").trim();
        String author = body.optString("author", "").trim();
        String text = body.optString("body", "").trim();

        if (poiId.isEmpty() || author.isEmpty() || text.isEmpty()) {
            writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "poiId, author and body are required");
            return;
        }
        if (author.length() > 100 || text.length() > 2000) {
            writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "author <= 100 chars, body <= 2000 chars");
            return;
        }

        JSONObject saved = new JSONObject();
        try (Connection conn = Db.getConnection();
             PreparedStatement ps = conn.prepareStatement(INSERT_SQL)) {
            ps.setString(1, poiId);
            ps.setString(2, author);
            ps.setString(3, text);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    saved.put("id", rs.getInt("id"));
                    Timestamp ts = rs.getTimestamp("created_at");
                    saved.put("createdAt", ts.toInstant().toString());
                }
            }
        } catch (SQLException e) {
            log("Error inserting comment", e);
            writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Database error");
            return;
        }

        saved.put("poiId", poiId);
        saved.put("author", author);
        saved.put("body", text);
        writeJson(resp, HttpServletResponse.SC_CREATED, saved.toString());
    }

    private static void writeJson(HttpServletResponse resp, int status, String json) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        try (PrintWriter w = resp.getWriter()) {
            w.write(json);
        }
    }

    private static void writeError(HttpServletResponse resp, int status, String message) throws IOException {
        writeJson(resp, status, new JSONObject().put("error", message).toString());
    }
}
