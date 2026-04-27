package com.iwt;

import javax.servlet.ServletContext;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class Db {

    private static String url;
    private static String user;
    private static String password;

    private Db() {}

    public static synchronized void init(ServletContext ctx) {
        url = pick(System.getenv("DB_URL"), ctx.getInitParameter("db.url"));
        user = pick(System.getenv("DB_USER"), ctx.getInitParameter("db.user"));
        password = pick(System.getenv("DB_PASSWORD"), ctx.getInitParameter("db.password"));
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new IllegalStateException("PostgreSQL JDBC driver not on classpath", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        if (url == null) {
            throw new SQLException("Db not initialized");
        }
        return DriverManager.getConnection(url, user, password);
    }

    private static String pick(String envVal, String fallback) {
        return (envVal != null && !envVal.isEmpty()) ? envVal : fallback;
    }
}
