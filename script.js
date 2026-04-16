/* =============================================
   TIME TRAVEL EXPLORER — script.js
   ============================================= */

'use strict';

// ─── DATA ────────────────────────────────────────────────────────────────────
const LOCATIONS = [
  {
    id: 'delhi',
    name: 'Delhi',
    region: 'National Capital Territory, India',
    icon: '🏰',
    lat: 28.6139,
    lng: 77.2090,
    color: '#f5c842',
    data: {
      '18th': {
        history: {
          title: 'The Mughal Twilight & Maratha Influence',
          text: 'The 18th century saw Delhi's glory fade as the Mughal Empire crumbled. The city witnessed the horrific sack by Nadir Shah in 1739, who plundered the legendary Peacock Throne. Following this, the Marathas and later the British East India Company competed for control of the weakened empire.',
          items: ['Nadir Shah's devastating invasion (1739)', 'Fall of the Mughal Empire acceleration', 'Maratha confederacy gains power in Delhi', 'Battle of Panipat III (1761) reshapes power']
        },
        culture: {
          title: 'Urdu Poetry & Courtly Life',
          text: 'Despite political turbulence, Delhi flourished as a cultural hub. The Mughal court continued to patronize Urdu poetry and ghazals. The tradition of mushairas (poetry gatherings) thrived in the narrow lanes of Shahjahanabad.',
          items: ['Mir Taqi Mir and Mir Dard pioneer Urdu poetry', 'Persian influence dominates courtly art', 'Qawwali music flourishes in shrines', 'Kathak dance evolves at Mughal court']
        },
        food: {
          title: 'Mughal Culinary Legacy',
          text: 'Delhi\'s cuisine in the 18th century was dominated by rich Mughal culinary tradition. Kebabs, biryanis, and elaborate shaarbats (sherbets) graced royal tables.',
          items: ['Seekh and Galouti kebabs refined', 'Saffron-infused Mughal biryani', 'Shahi tukda — bread pudding royale', 'Yakhni — aromatic meat broth']
        },
        art: {
          title: 'Late Mughal Miniature Painting',
          text: 'Mughal miniature painting continued but shifted from royal patronage. Artists began working for nobles and emerging merchant classes, creating a more accessible yet refined style.',
          items: ['Miniature paintings on ivory', 'Marble inlay work (pietra dura)', 'Intricate carpet weaving traditions', 'Gold and silver thread embroidery (zardozi)']
        },
        facts: [
          { label: 'Population', value: '~400,000' },
          { label: 'Ruler', value: 'Emperor Bahadur Shah I' },
          { label: 'Capital', value: 'Shahjahanabad' },
          { label: 'Currency', value: 'Mughal Rupee' }
        ],
        quote: '"Delhi is a city that has seen countless rising and falling, but what remains eternal is its spirit of resilience." — Mir Taqi Mir'
      },
      '19th': {
        history: {
          title: 'British Raj & The 1857 Uprising',
          text: 'The 19th century was defined by the First War of Indian Independence (1857). Delhi became the epicentre as soldiers and citizens rallied under the last Mughal, Bahadur Shah Zafar. The British crushed the rebellion and exiled Zafar, marking the formal end of the Mughal Empire.',
          items: ['Siege of Delhi (1857) during the Uprising', 'Bahadur Shah Zafar — last Mughal emperor', 'British took formal control post-1857', 'Delhi ceases to be the imperial capital temporarily']
        },
        culture: {
          title: 'Colonial Transformation',
          text: 'Victorian architecture merged with Mughal styles. English-medium schools emerged alongside traditional madrasas, creating a cultural hybrid that would define modern India.',
          items: ['Delhi College fosters Urdu-English intellectualism', 'Ghalib writes immortal ghazals in Delhi', 'Rise of print culture and newspapers', 'Blend of Indo-Saracenic architecture']
        },
        food: {
          title: 'Street Food Culture Emerges',
          text: 'Delhi\'s famous street food culture began to take shape with the establishment of dhabas and street stalls in Chandni Chowk marketplace.',
          items: ['Paratha Wali Gali established in Chandni Chowk', 'Jalebi and rabri become popular', 'Nihari as a dawn meal tradition', 'Chaat culture begins to flourish']
        },
        art: {
          title: 'Renaissance of Delhi Crafts',
          text: 'Delhi craftsmen adapted to new British patrons while maintaining traditional skills. Fine metalwork, jewellery, and textiles found a new export market.',
          items: ['Silver filigree work for colonial markets', 'Block printing on cotton textiles', 'Ivory carving for export trade', 'Bidri metalwork popularized']
        },
        facts: [
          { label: 'Population', value: '~150,000' },
          { label: 'Ruler', value: 'British East India Co.' },
          { label: 'Key Event', value: '1857 Uprising' },
          { label: 'Language', value: 'Urdu / English' }
        ],
        quote: '"Hazaron khwahishein aisi ke har khwahish pe dam nikle..." — Mirza Ghalib'
      },
      '20th': {
        history: {
          title: 'India's Independence & Capital of a Nation',
          text: 'Delhi witnessed India\'s freedom struggle, housed the Indian National Congress, and on 15 August 1947, became the capital of an independent nation. The Partition brought millions of refugees, transforming Delhi\'s demographics forever.',
          items: ['Delhi becomes capital of British India (1911)', 'Mahatma Gandhi\'s marches and stays in Delhi', 'Independence declared on 15 August 1947', 'Partition displaces millions; refugees reshape Delhi']
        },
        culture: {
          title: 'Bollywood, Republic & Modern Identity',
          text: 'Delhi became the political and cultural nerve centre of India. Republic Day parades on Kartavya Path, intellectual debates at Jawaharlal Nehru University, and the rise of Hindi cinema defined this era.',
          items: ['Republic Day Parade tradition begins (1950)', 'India Gate becomes a symbol of nationhood', 'Rise of Delhi University academic culture', 'Punjabi cultural infusion post-Partition']
        },
        food: {
          title: 'The Great Delhi Food Fusion',
          text: 'Partition refugees from Punjab brought tandoori cooking to Delhi, fundamentally reshaping the city\'s food culture. Motimahal restaurant made tandoori chicken globally famous.',
          items: ['Motimahal invents Butter Chicken (1950s)', 'Tandoori cuisine popularized', 'Rajma-chawal becomes a Delhi staple', 'South Indian dosas arrive via migrants']
        },
        art: {
          title: 'Progressive Artists & National Art',
          text: 'The Progressive Artists Group challenged traditional forms. Institutions like Lalit Kala Akademi were established to promote Indian art on the world stage.',
          items: ['Lalit Kala Akademi founded (1954)', 'M.F. Husain paints revolutionary India', 'Sangeet Natak Akademi established', 'Indian classical music gets state patronage']
        },
        facts: [
          { label: 'Population', value: '~7.2 Million (1991)' },
          { label: 'Status', value: 'National Capital' },
          { label: 'Key Event', value: 'Independence 1947' },
          { label: 'Language', value: 'Hindi / Punjabi / Urdu' }
        ],
        quote: '"At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom." — Jawaharlal Nehru'
      },
      'modern': {
        history: {
          title: 'Megacity & Digital Capital',
          text: 'Delhi has transformed into a sprawling megacity and part of the NCR (National Capital Region), home to over 30 million people. It hosts the headquarters of the Indian government and is a hub for technology, commerce, and diplomacy.',
          items: ['Delhi Metro launched (2002) revolutionizes transport', 'Commonwealth Games (2010) transforms infrastructure', 'Smart City initiatives and digital governance', 'Ayushman Bharat and Digital India programs']
        },
        culture: {
          title: 'Global City, Local Soul',
          text: 'Modern Delhi is a melting pot of cultures — from Sufi music nights at Nizamuddin Dargah to EDM festivals, from Jantar Mantar protests to startup launches at Connaught Place.',
          items: ['Culture festivals at Purana Qila', 'India International Trade Fair', 'Street art culture in Lodhi Colony', 'Vibrant LGBTQ+ and youth culture']
        },
        food: {
          title: 'Street Food Capital of the World',
          text: 'Delhi is globally recognized as a premier street food destination. Chandni Chowk and defence colony markets attract food tourists from across the world.',
          items: ['Papdi chaat and golgappe dominate street culture', 'Karim\'s — legendary Mughlai restaurant', 'Paranthe Wali Gali a tourist landmark', 'Fusion cafe culture in Hauz Khas Village']
        },
        art: {
          title: 'Contemporary Art & Architecture',
          text: 'Delhi has a thriving contemporary art scene with galleries like NGMA (National Gallery of Modern Art) and Kiran Nadar Museum. The city\'s architecture blends ancient monuments with glass-and-steel modernity.',
          items: ['NGMA and Kiran Nadar Museum of Art', 'Signature Bridge — modern engineering marvel', 'Akshardham Temple — largest Hindu temple', 'Street art at Lodhi Art District']
        },
        facts: [
          { label: 'Population', value: '~32 Million' },
          { label: 'Metro Network', value: '390+ km' },
          { label: 'GDP', value: '$293 Billion' },
          { label: 'Airports', value: 'IGI Airport' }
        ],
        quote: '"Delhi is not just a city. It is an emotion, a civilization layered through time." — Modern proverb'
      }
    }
  },
  {
    id: 'odisha',
    name: 'Odisha',
    region: 'Eastern India',
    icon: '🛕',
    lat: 20.9517,
    lng: 85.0985,
    color: '#38d5f7',
    data: {
      '18th': {
        history: {
          title: 'Maratha Rule & Tribal Kingdoms',
          text: 'In the 18th century, Odisha came under Maratha control after centuries of Muslim rule. The region was divided among various feudatory chiefs, and tribal kingdoms maintained autonomy in the interior forests.',
          items: ['Maratha Bhonsles gain control of coastal Odisha', 'Puri Jagannath temple remains a major pilgrimage', 'Zamindari system established by Marathas', 'Concurrent rule of tribal kings in interior']
        },
        culture: {
          title: 'Jagannath Culture & Temple Traditions',
          text: 'The Jagannath temple in Puri remained the spiritual and cultural nucleus of Odisha. The Rath Yatra continued as one of the world\'s largest religious gatherings.',
          items: ['Rath Yatra draws hundreds of thousands', 'Odissi dance form preserved in temple rituals', 'Panchayat system of village governance', 'Sanskrit scholarship in monastic centres']
        },
        food: {
          title: 'Temple Cuisine — Mahaprasad',
          text: 'Odisha\'s culinary identity was deeply tied to temple traditions. The Mahaprasad at Jagannath temple — cooked in 752 earthen pots — is one of the world\'s largest religious kitchen operations.',
          items: ['Mahaprasad — sacred Jagannath temple food', 'Pakhala bhata — fermented rice, a staple', 'Dalma — lentils with vegetables', 'Chhena poda — original cheesecake of India']
        },
        art: {
          title: 'Pattachitra & Temple Sculpture',
          text: 'Odisha\'s artistic traditions centred around Pattachitra painting and the extraordinarily elaborate temple sculptures of Bhubaneswar and Konark.',
          items: ['Pattachitra — cloth-based scroll painting', 'Stone sculpture tradition in Bhubaneswar', 'Palm leaf manuscript painting (Talapatra)', 'Dokra metal craft in tribal areas']
        },
        facts: [
          { label: 'Ruling Power', value: 'Maratha Bhonsles' },
          { label: 'Key site', value: 'Puri Jagannath Temple' },
          { label: 'Main river', value: 'Mahanadi' },
          { label: 'Script', value: 'Odia (Kalinga script)' }
        ],
        quote: '"Jagannath-ism is a philosophy of universal brotherhood — open to all, regardless of caste or creed." — Temple tradition'
      },
      '19th': {
        history: {
          title: 'British Annexation & Resistance',
          text: 'Odisha was gradually brought under British control through the early 19th century. Paika tribes staged the Paika Rebellion (1817) — one of India\'s first major uprisings against British rule, predating 1857.',
          items: ['Paika Rebellion (1817) — first war of independence', 'British East India Company annexes Odisha', 'Terrible famine of 1866 kills millions', 'Chakra Bisoi leads tribal resistance movements']
        },
        culture: {
          title: 'Reform Movements & Odia Identity',
          text: 'The 19th century saw a strong Odia cultural renaissance. Intellectuals fought to preserve the Odia language from Bengali and Telugu encroachment, leading to the formation of a distinct Odia identity.',
          items: ['Fakir Mohan Senapati pioneers modern Odia literature', 'Odia is recognized as a distinct language', 'Sarala Das\'s Mahabharata in Odia celebrated', 'First Odia newspaper published (Utkal Dipika, 1866)']
        },
        food: {
          title: 'Agrarian Food Culture',
          text: 'As Odisha faced colonial taxation and famine, traditional agrarian food practices became survival tools. Simple but nutritious food traditions were preserved through community sharing.',
          items: ['Pakhala — fermented rice becomes a survival staple', 'Handvo — communal cooking tradition', 'Mahua flower as a food source in tribal areas', 'Fish curry with mustard — coastal staple']
        },
        art: {
          title: 'Crafts Under Colonial Patronage',
          text: 'British collectors began documenting and exporting Odishan crafts. Pattachitra artists found new patrons, and silver filigree work from Cuttack gained international recognition.',
          items: ['Cuttack silver filigree (Tarakasi) exported to Europe', 'Appliqué work of Pipli gains popularity', 'Pattachitra adapted for colonial craft exhibitions', 'Sambalpuri weaving tradition flourishes']
        },
        facts: [
          { label: 'Population', value: '~5 Million' },
          { label: 'Ruler', value: 'British East India Co.' },
          { label: 'Key Event', value: 'Paika Rebellion 1817' },
          { label: 'Famine year', value: 'Na Anka (1866)' }
        ],
        quote: '"The Paika Rebellion was not a mutiny — it was a war for freedom fought by the sons of the soil 40 years before 1857." — Historians'
      },
      '20th': {
        history: {
          title: 'Formation of Odisha State & Industrialization',
          text: 'Odisha became a separate province in 1936 — the first state formed on linguistic lines in India. After independence, it fought to reclaim territories and underwent heavy industrialization.',
          items: ['Odisha separate province formed (April 1, 1936)', 'Integration of 26 princely states post-Independence', 'TISCO and NALCO — industrial giants established', 'Cyclone devastation and resilience (1999)']
        },
        culture: {
          title: 'Odissi Dance Revival & National Recognition',
          text: 'The 20th century saw a glorious revival of Odissi dance from near extinction. Pioneers like Guru Kelucharan Mohapatra brought Odissi to national and international stages.',
          items: ['Guru Kelucharan Mohapatra revives Odissi', 'Sangeet Natak Akademi recognizes Odissi (1958)', 'Dhauli Kalinga Mahotsava — major cultural festival', 'Bhubaneswar becomes a planned capital city (1948)']
        },
        food: {
          title: 'The Food of Resilience',
          text: 'Despite natural disasters and poverty, Odisha\'s food culture remained rich and diverse. Tribal communities preserved unique food traditions that are now being recognized globally.',
          items: ['Chhena poda — baked cottage cheese dessert', 'Mudhi mansa — puffed rice with mutton', 'Besara — mustard-and-turmeric vegetable curry', 'Rasagola origins traced to Odisha (12th century)']
        },
        art: {
          title: 'Modern Odia Literature & Cinema',
          text: 'The 20th century produced remarkable Odia writers, poets, and early cinema. Odia films began in the 1930s, and the state produced noted poets like Sachi Rout Rai.',
          items: ['First Odia film — Sita Bibaha (1934)', 'Sahitya Akademi awards to Odia writers', 'Soumendra Nath Maitra expands Odia music', 'Contemporary tribal art gains state recognition']
        },
        facts: [
          { label: 'Statehood', value: 'April 1, 1936' },
          { label: 'Population', value: '~31 Million (1991)' },
          { label: 'Capital', value: 'Bhubaneswar (1948)' },
          { label: 'Language', value: 'Odia (Official)' }
        ],
        quote: '"Odisha is a land where stone speaks, canvas dances, and the river sings." — Manoj Das, Odia writer'
      },
      'modern': {
        history: {
          title: 'Odisha Today — Sports, Governance & Growth',
          text: 'Modern Odisha has emerged as a model state in disaster management, tribal welfare, and sports. The state hosted the Hockey World Cup twice and has dramatically reduced poverty and improved literacy.',
          items: ['Hockey World Cup hosted in Bhubaneswar (2018, 2023)', 'Cyclone Fani response — global disaster management model', 'Odia declared 6th Classical Language of India (2014)', 'Startup Odisha initiative fosters innovation']
        },
        culture: {
          title: 'Cultural Diplomacy & Global Art',
          text: 'Odissi dance is now one of the most internationally recognized of India\'s classical dance forms. The Konark Dance Festival draws global performers and audiences each year.',
          items: ['Konark Dance Festival — international acclaim', 'Odissi performed at UNESCO events worldwide', 'Tribal art recognized at global exhibitions', 'Ekamra Walks — heritage tourism initiative']
        },
        food: {
          title: 'Odia Cuisine Goes Global',
          text: 'Odia cuisine is enjoying a renaissance. Chefs and food bloggers are bringing dishes like Chhena Poda, Pakhala, and Dalma to food festivals worldwide.',
          items: ['Pakhala Dibasa — World Pakhala Day (March 20)', 'Chhena Poda featured in international dessert lists', 'GI tag for Rasagola asserted by Odisha', 'Street food of Bhubaneswar in food tourism circuit']
        },
        art: {
          title: 'Digital Pattachitra & Living Crafts',
          text: 'Artisans of Odisha are adapting ancient crafts for digital marketplaces. GI-tagged crafts, NFT Pattachitra art, and designer Sambalpuri products are finding global buyers.',
          items: ['GI tags for Sambalpuri saree and Pattachitra', 'Crafts village at Raghurajpur boosts artisans', 'Digital marketplace for tribal art', 'Odisha Art Gallery in Bhubaneswar']
        },
        facts: [
          { label: 'Population', value: '~46 Million' },
          { label: 'Capital', value: 'Bhubaneswar' },
          { label: 'Classical Lang.', value: 'Odia (since 2014)' },
          { label: 'Known for', value: 'Hockey & Konark' }
        ],
        quote: '"When the world thinks of hockey, it will think of Odisha. When it thinks of classical dance, it will think of Odissi." — Sports Minister'
      }
    }
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    region: 'Uttar Pradesh, India',
    icon: '🪔',
    lat: 25.3176,
    lng: 82.9739,
    color: '#e05c84',
    data: {
      '18th': {
        history: { title: 'The Eternal City Under Transition', text: 'Varanasi (Kashi) passed from Mughal to Maratha to Awadh rule through the 18th century, yet maintained its status as the holiest city in Hinduism. The Kashi Vishwanath Temple was rebuilt by Ahilya Bai Holkar in 1780.', items: ['Kashi Vishwanath Temple rebuilt (1780) by Ahilya Bai Holkar', 'Maratha pilgrimage routes revitalized', 'Banaras becomes a princely state under the British', 'Sanskrit learning centres attract scholars from all over India'] },
        culture: { title: 'Sanskrit Scholarship & Spiritual Traditions', text: 'Varanasi was the bedrock of Sanskrit scholarship. The city\'s ghats were centres of religious discourse, yoga, and philosophical debate.', items: ['Tulsidas\'s Ramcharitmanas tradition continues here', 'Kashi school of Vedanta philosophy', 'Morning ganga aarti traditions formalized', 'Gharanas of classical music established'] },
        food: { title: 'Sacred Offerings & Street Food', text: 'Food in Varanasi was deeply connected to temple rituals. Prasad from the Kashi Vishwanath temple and local sweets were an integral part of spiritual life.', items: ['Kachori sabzi — the breakfast of Kashi', 'Banarasi paan — a cultural tradition', 'Malaiyyo — winter morning dessert', 'Thandai — spiced milk beloved by locals'] },
        art: { title: 'Banarasi Silk & Classical Music', text: 'Banarasi brocade silk, woven on hand looms, was among the finest in the Mughal world. The city\'s gharanas of Hindustani classical music attracted royal patrons.', items: ['Banarasi silk weaving with gold zari', 'Banaras Gharana of classical music', 'Brass and bell metal crafts', 'Wooden toy carving tradition'] },
        facts: [{ label: 'Age', value: 'Over 3000 years' }, { label: 'Holy River', value: 'Ganga' }, { label: 'Key Temple', value: 'Kashi Vishwanath' }, { label: 'Scholar Pop.', value: 'Brahmin majority' }],
        quote: '"Kashi is the light of the universe. To die in Kashi is liberation (moksha)." — Hindu scripture'
      },
      '19th': {
        history: { title: 'Colonial Legacy & Princely Protection', text: 'Varanasi became a British protectorate while retaining its spiritual autonomy. The colonial period saw the establishment of Banaras Hindu University (founded 1916, planned in the 1890s) and increased scholarly output.', items: ['British Residency established in Varanasi', 'Banaras Princely State maintained', 'Annie Besant moves to Varanasi for spiritual studies', 'Orientalist scholars document Varanasi\'s traditions'] },
        culture: { title: 'Religious Reform & Western Interest', text: 'Varanasi attracted Western scholars and spiritual seekers. Simultaneously, reformers like Ram Mohan Roy and later figures challenged orthodox practices.', items: ['Mark Twain visits and writes about Varanasi', 'Max Müller studies Sanskrit texts from here', 'Swami Vivekananda visits and is inspired', 'Theatrical Ramlila performances attract thousands'] },
        food: { title: 'Street Food Capital of North India', text: 'Varanasi\'s street food culture exploded in the 19th century. The famous chaat, lassi, and sweets of Banaras became beloved across North India.', items: ['Tamatar chaat — Varanasi\'s unique preparation', 'Banarasi lassi served in clay pots', 'Rabri and malaiyyo — winter specials', 'Choora matar — a seasonal favourite'] },
        art: { title: 'Banarasi Weaving for Colonial Markets', text: 'Banarasi silk weavers adapted their designs for colonial tastes, blending Persian motifs with European patterns, creating entirely new design vocabularies.', items: ['Kimkhwab — heavy brocade for royals', 'Tissue silk woven for colonial export', 'Musical instrument making (tablas, sitars)', 'Toy making craft of Varanasi'] },
        facts: [{ label: 'Population', value: '~200,000' }, { label: 'Status', value: 'British Protectorate' }, { label: 'Key Institution', value: 'Sanskrit College' }, { label: 'Trade', value: 'Silk & Spices' }],
        quote: '"Banaras is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together." — Mark Twain'
      },
      '20th': {
        history: { title: 'Freedom Movement & Post-Independence Growth', text: 'Varanasi played a key role in India\'s freedom movement. Jawaharlal Nehru represented the Phulpur constituency nearby. Post-Independence, Banaras Hindu University became one of Asia\'s largest universities.', items: ['Mahatma Gandhi visits and speaks at BHU (1916)', 'Non-cooperation movement participation', 'Banaras Hindu University grows rapidly', 'Ravi Shankar and Bismillah Khan bring Varanasi to global music fame'] },
        culture: { title: 'World Music Capital', text: 'Varanasi became synonymous with Hindustani classical music and produced globally recognized musicians. The city\'s ghats remained venues for spiritual music and debate.', items: ['Ustad Bismillah Khan — shehnai maestro', 'Ravi Shankar — sitar legend', 'Morning ragas at the ghats tradition', 'Kabir Panthi spiritual music revival'] },
        food: { title: 'Culinary Identity Cemented', text: 'Varanasi\'s street food became a cultural identity. The city was increasingly seen as a culinary destination, not just a spiritual one.', items: ['Banarasi paan shops — iconic cultural spaces', 'Litti Chokha — a regional speciality', 'Malai toast — colonial fusion food', 'Petha of Agra vs Banarasi sweets celebrated'] },
        art: { title: 'Silk & Digital Age Arts', text: 'The handloom silk industry faced competition from power looms but remained a symbol of Indian craftsmanship. Cultural institutions began documenting the art forms of Varanasi.', items: ['Banarasi silk gets GI tag (20th century push)', 'Bharat Kala Bhavan museum established', 'Ganga Mahotsava festival instituted', 'Film industry discovers Varanasi as a backdrop'] },
        facts: [{ label: 'University', value: 'BHU (est. 1916)' }, { label: 'Famous for', value: 'Music & Silk' }, { label: 'Population', value: '~1 Million (1991)' }, { label: 'Key Festival', value: 'Dev Deepawali' }],
        quote: '"In Varanasi, death is not feared — it is celebrated as the ultimate liberation." — Traditional saying'
      },
      'modern': {
        history: { title: 'Tourism, Tech & Spiritual Smart City', text: 'Modern Varanasi is undergoing a massive transformation under Kashi Vishwanath Corridor projects. Tourism has soared, and the city attracts over 7 million visitors annually.', items: ['Kashi Vishwanath Corridor opened (2021)', 'Varanasi Smart City initiative', 'International yoga and wellness tourism', 'UNESCO creative city of music designation'] },
        culture: { title: 'Global Spiritual Destination', text: 'Varanasi is one of the world\'s top spiritual destinations. The Ganga Aarti is broadcast globally, and the city hosts international music and yoga festivals.', items: ['Ganga Aarti streamed live globally', 'International Yoga Festival at Rishikesh-Varanasi corridor', 'Dev Deepawali — world\'s largest lamp festival', 'Virtual reality temple tours introduced'] },
        food: { title: 'Gourmet Street Food on Global Maps', text: 'Varanasi appears on every international foodie\'s bucket list. Its chaat, lassi, and sweets are featured in global food documentaries.', items: ['Banarasi chaat in international food documentaries', 'Malaiyo — seasonal winter dessert goes viral', 'Organic ghee and superfood traditions', 'Temple prasad food experiences for tourists'] },
        art: { title: 'Handloom Heritage & Digital Crafts', text: 'Despite challenges, Banarasi silk remains India\'s finest handloom textile. Online marketplaces have given weavers direct access to global buyers.', items: ['Online Banarasi silk stores go global', 'Weaver empowerment programs at Varanasi', 'NIFT collaboration with Banarasi weavers', 'Digital art installations at the Ghats'] },
        facts: [{ label: 'Annual Visitors', value: '7+ Million' }, { label: 'Key Monument', value: 'KV Corridor' }, { label: 'Famous River', value: 'River Ganga' }, { label: 'Status', value: 'Heritage City' }],
        quote: '"Varanasi is where the eternal meets the everyday — where time stands still and rushes forward at once." — Contemporary traveller'
      }
    }
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra, India',
    icon: '🌊',
    lat: 19.0760,
    lng: 72.8777,
    color: '#34d399',
    data: {
      '18th': {
        history: { title: 'Seven Islands & Portuguese-British Transition', text: 'Mumbai (Bombay) was a collection of seven islands gifted by the Portuguese to the British in 1661 as part of a royal dowry. By the 18th century, it was being transformed by the British East India Company into a formidable trading port.', items: ['British fortify Bombay Castle', 'Bombay as a key East India Company port', 'Land reclamation projects begin early', 'Parsi community establishes itself in trade'] },
        culture: { title: 'Parsi & Koli Culture', text: 'The Parsi community — Zoroastrian refugees from Persia — became foundational to Bombay\'s commercial and cultural identity. The Koli fisher community maintained their ancient coastal traditions.', items: ['Parsi community establishes fire temples', 'Koli fishing community dominates shoreline', 'Gujarati merchants establish trading houses', 'Earliest English schools established'] },
        food: { title: 'Port City Food Fusion', text: 'As a trading port, Bombay received culinary influences from across the world — Portuguese, Parsi, Gujarati, and Konkan cuisines merged in this cosmopolitan island city.', items: ['Dhansak — signature Parsi rice dish', 'Bombil (Bombay Duck) fish fry', 'Vindaloo — Portuguese-Indian fusion', 'Modak — Ganesh festival sweet'] },
        art: { title: 'Maritime Architecture & Trade Art', text: 'Bombay\'s architecture began to take its distinctive blend of European, Gothic, and Indian styles. Early theatre and music were imported from Surat and Pune.', items: ['Fort Bombay\'s bastions and churches', 'Parsi theatre tradition (Natak) begins', 'Early printing presses established', 'Textile trading art — Kalamkari imports'] },
        facts: [{ label: 'What it was', value: 'British Trading Port' }, { label: 'Ruler', value: 'East India Company' }, { label: 'Key Community', value: 'Parsi Traders' }, { label: 'Harbor', value: 'Natural deep harbor' }],
        quote: '"Bombay is a city built on ambition, sea salt, and the sweat of a thousand cultures." — Port historian'
      },
      '19th': {
        history: { title: 'Cotton Boom & Industrial Revolution', text: 'The 19th century turned Bombay into India\'s industrial heart. The cotton boom during the American Civil War made Bombay fabulously wealthy. The first railway in Asia ran from Bombay to Thane in 1853.', items: ['First railway in Asia: Bombay–Thane (1853)', 'Cotton boom during American Civil War (1860s)', 'Bombay stock exchange — Asia\'s oldest (1875)', 'Gothic Railway stations and colonial buildings'] },
        culture: { title: 'Colonial Architecture & Theatre', text: 'Victorian Gothic buildings like the Chhatrapati Shivaji Terminus and High Court transformed Bombay\'s skyline. Parsi theatre and early Marathi drama thrived.', items: ['CST (VT) Station built (1888)', 'Gateway of India planning begins', 'Parsi theatre — first professional theatre in India', 'Bal Gangadhar Tilak and Ganesh Chaturthi as social movement'] },
        food: { title: 'Irani Cafes & Vada Pav Precursors', text: 'Iranian immigrants established Irani cafes that became Bombay\'s iconic social spaces. The working-class food culture started shaping what would become Mumbai\'s legendary street food.', items: ['Irani chai and bun maska at cafes', 'Keema pau develops in working-class areas', 'Bombay roti — flat bread with curries', 'Alphonso mango — Konkan export to the world'] },
        art: { title: 'Bollywood Precursors — Silent Films', text: 'The foundations of India\'s film industry were laid in Bombay. Dadasaheb Phalke made India\'s first feature film Raja Harishchandra in Bombay in 1913.', items: ['Dadasaheb Phalke films Raja Harishchandra (1913)', 'Early photography studios open in Bombay', 'Lalit Kala traditions from Pune blend in', 'Gramophone recordings of Marathi classical music'] },
        facts: [{ label: 'Milestone', value: 'First Asian Railway 1853' }, { label: 'Exchange', value: 'BSE est. 1875' }, { label: 'Population', value: '~820,000 (1891)' }, { label: 'Key product', value: 'Cotton' }],
        quote: '"Bombay is the urbs prima in Indis — the first city of India." — Colonial Governor'
      },
      '20th': {
        history: { title: 'Independence, Partition & Bollywood', text: 'Post-Independence Bombay became the commercial capital of India. The city\'s film industry — Bollywood — emerged as the world\'s largest by number of films produced. Bombay became Mumbai in 1995.', items: ['India\'s financial capital post-Independence', 'Bombay renamed Mumbai (1995)', 'Bollywood becomes global cinema power', 'CST and local trains become city\'s lifeline'] },
        culture: { title: 'Bollywood & Cosmopolitan Identity', text: 'Mumbai developed a unique cosmopolitan identity shaped by immigration from across India. It became India\'s city of dreams, where ambition overtook everything else.', items: ['Golden era of Bollywood (1950s–70s)', 'Dilip Kumar, Raj Kapoor, Nargis define cinema', 'Rock and jazz culture in mid-century Bombay', 'Ganesh Chaturthi as massive public celebration'] },
        food: { title: 'Vada Pav — The People\'s Food', text: 'The 20th century gave birth to iconic Mumbai street food. Vada pav — a spiced potato fritter in bread — became the city\'s unofficial emblem, fuelling its millions of workers.', items: ['Vada Pav created (1960s–70s)', 'Chaat culture from UP migrants', 'Bhel Puri — seaside snack culture', 'Iranian cafes as intellectual hubs'] },
        art: { title: 'Progressive Art & Cinema', text: 'The Progressive Artists Group was founded in Bombay (1947), revolutionizing Indian modern art. Artists like M.F. Husain, S.H. Raza, and F.N. Souza brought Indian art to international recognition.', items: ['Progressive Artists Group founded in Bombay (1947)', 'Jehangir Art Gallery becomes artist hub', 'Prithvi Theatre — iconic dramatic space', 'Film posters as folk art tradition'] },
        facts: [{ label: 'Renamed', value: 'Mumbai in 1995' }, { label: 'Film Industry', value: 'Bollywood' }, { label: 'Population', value: '~12.5 Million (1991)' }, { label: 'BSE', value: 'Asia\'s oldest exchange' }],
        quote: '"In Mumbai, every person who catches a local train is a hero. The city does not give up on anyone." — Shiv Sena proverb'
      },
      'modern': {
        history: { title: 'Financial Capital & Smart City', text: 'Modern Mumbai is India\'s financial powerhouse. It houses the Bombay Stock Exchange, Reserve Bank of India, and is home to some of Asia\'s wealthiest individuals alongside sprawling slums.', items: ['Mumbai hosts India\'s top financial institutions', 'Dharavi — Asia\'s largest slum has $1B economy', 'Mumbai Metro expansion transforming commutes', 'India\'s first underwater metro tunnel (2024)'] },
        culture: { title: 'Global City, Bollywood Capital', text: 'Mumbai\'s cultural impact is global. Bollywood films are watched in over 50 countries, and Netflix, Amazon Prime have partnered with Mumbai studios to produce original content.', items: ['OTT revolution — Mumbai studios pivot to streaming', 'Kala Ghoda Arts Festival — premier cultural event', 'LGBTQ+ Pride March — one of Asia\'s largest', 'Stand-up comedy revolution from Mumbai'] },
        food: { title: 'World-Class Dining & Street Food Heritage', text: 'Mumbai has both Michelin-star aspirants and world-famous street food. Marine Drive, Juhu beach, and Mohammed Ali Road are pilgrimage sites for food lovers.', items: ['Mohammed Ali Road — Eid food destination', 'Bastian and Masque — fine dining revolution', 'Juhu beach bhel puri — iconic experience', 'Dabbawalas — world\'s most efficient food delivery system'] },
        art: { title: 'Contemporary Art Powerhouse', text: 'Mumbai has become South Asia\'s premier contemporary art market. The Jehangir Art Gallery, NGMA Mumbai, and private galleries drive India\'s art market.', items: ['India Art Fair impacts driven by Mumbai galleries', 'Street art at Dharavi and Bandra', 'Prithvi Theatre — world-class stage plays', 'Architectural heritage conservation movement'] },
        facts: [{ label: 'Population', value: '~20+ Million' }, { label: 'GDP', value: '~$310 Billion' }, { label: 'BSE Listing', value: '5,000+ companies' }, { label: 'Film Output', value: '1000+ films/yr' }],
        quote: '"Mumbai is not just a city — it\'s a feeling. It takes your worst days and says: tomorrow will be better." — Amitabh Bachchan'
      }
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan, India',
    icon: '🏯',
    lat: 26.9124,
    lng: 75.7873,
    color: '#e8923a',
    data: {
      '18th': {
        history: { title: 'Founded City of the Maharajas', text: 'Jaipur was founded in 1727 by Maharaja Sawai Jai Singh II — one of the first planned cities in the world. Built according to Vastu Shastra and Shilpa Shastra principles, it was laid out in a grid with wide avenues.', items: ['Founded in 1727 by Sawai Jai Singh II', 'First planned city in India (grid layout)', 'Jantar Mantar observatory built to study astronomy', 'Amer Fort remains the seat of Kachwaha Rajputs'] },
        culture: { title: 'Royal Arts & Astronomy', text: 'Jai Singh was not just a ruler but an astronomer and patron of arts. He built five astronomical observatories (Jantar Mantar) across India and invited scholars from Europe and Persia.', items: ['Jantar Mantar — largest sundial in the world', 'Sanskrit astronomical manuscripts compiled', 'Rajput miniature painting school flourishes', 'Rajasthani folk music (Manganiyar) patronized'] },
        food: { title: 'Royal Rajasthani Cuisines', text: 'Jaipur\'s cuisine developed from the need to survive in arid conditions. Rich spices, dry lentils, and preserved foods became the foundation of an extraordinarily flavourful cuisine.', items: ['Dal Baati Churma — quintessential Rajasthani dish', 'Laal Maas — fiery red mutton curry', 'Ghevar — lattice sweet for festivals', 'Ker Sangri — wild desert vegetables'] },
        art: { title: 'Rajput Miniature & Blue Pottery', text: 'The Jaipur school of miniature painting combined Rajput and Mughal influences. Blue Pottery — introduced via Persian trade routes — became a distinctive Jaipur craft.', items: ['Jaipur school of Rajput miniature painting', 'Blue Pottery tradition from Persia to Jaipur', 'Block printing on textiles (Sanganer style)', 'Kundan and Meenakari jewellery making'] },
        facts: [{ label: 'Founded', value: '1727 by Jai Singh II' }, { label: 'City plan', value: 'Grid-based Vastu' }, { label: 'Color', value: 'Pink City' }, { label: 'Key site', value: 'Jantar Mantar' }],
        quote: '"Jaipur is not built with bricks — it is built with mathematics, astronomy, and the vision of a king who dreamed in stars." — Royal chronicler'
      },
      '19th': {
        history: { title: 'Alliance with the British & Modernization', text: 'Jaipur signed a treaty with the British East India Company, becoming a princely state under British suzerainty. The Maharajas used their autonomy to modernize Jaipur\'s infrastructure.', items: ['Jaipur treaty with British EIC', 'Maharaja Ram Singh II paints Jaipur pink (1876)', 'Albert Hall Museum built (Indo-Saracenic architecture)', 'Rail connectivity to Jaipur established'] },
        culture: { title: 'Welcoming Queen Victoria', text: 'When Prince Albert visited in 1876, Maharaja Ram Singh II painted the entire city terracotta pink — the colour of welcome — to honour the guest. The Pink City name has stuck ever since.', items: ['City painted pink for Prince Albert\'s visit (1876)', 'Albert Hall Museum constructed', 'Colonial schools and modern infrastructure', 'Rajasthani folk festivals gain prominence'] },
        food: { title: 'Royal Feasts Meet Colonial Influence', text: 'The Maharajas of Jaipur hosted elaborate feasts blending traditional Rajasthani cuisine with colonial influences. Chef traditions in royal kitchens became sophisticated culinary schools.', items: ['Royal hunting cuisine — Shikari Khana', 'Pyaaz kachori — a beloved street snack', 'Imarti — a rose-water flavoured dessert', 'Churma Ladoos for colonial guests'] },
        art: { title: 'Crafts for Colonial Markets', text: 'Jaipur\'s artisans found eager markets among British collectors and international exhibitions. The city\'s jewellery, textiles, and metalwork gained world recognition.', items: ['Jaipur jewellery at international exhibitions', 'Sanganer block prints exported to Europe', 'Lac bangles — Jaipur\'s iconic craft', 'Jawahar Kala Kendra precursor institutions'] },
        facts: [{ label: 'Painted Pink', value: '1876 for Prince Albert' }, { label: 'Museum', value: 'Albert Hall (1887)' }, { label: 'Status', value: 'Princely State' }, { label: 'Railway', value: 'Connected to Delhi' }],
        quote: '"The Pink City is the jewel of Rajputana — a land where hospitality is not a custom but a sacred duty." — British traveller, 1890'
      },
      '20th': {
        history: { title: 'Integration into India & Tourism Rise', text: 'Following Independence, Jaipur merged with the Indian Union through the tireless efforts of Sardar Patel. It became the capital of Rajasthan. The city\'s palaces and forts became UNESCO heritage sites and major tourist attractions.', items: ['Jaipur joins Indian Republic (1949)', 'Becomes capital of Rajasthan state', 'Hawa Mahal and Amber Fort become tourism icons', 'Political career of Maharanis in Indian parliament'] },
        culture: { title: 'Jaipur Literature Festival & Cultural Revival', text: 'Late in the 20th century, Jaipur positioned itself as a cultural powerhouse. The groundwork for what would become the world\'s largest literary festival was laid.', items: ['Rajasthani folk music documented and revived', 'Sawai Gandharv Music Festival grows in prominence', 'Pushkar Camel Fair becomes global cultural event', 'Heritage hotels in palaces pioneer tourism'] },
        food: { title: 'Heritage Cuisine Goes Mainstream', text: 'Rajasthani cuisine began to be celebrated nationally after decades of being underrepresented. Restaurants serving authentic Rajasthani thalis appeared across India.', items: ['Rajasthani thali — the complete culinary experience', 'Mirchi Bada — Jaipur\'s beloved snack', 'Milk Cake (Kalakand) of Alwar-Jaipur region', 'Rajasthani cuisine in Bollywood films'] },
        art: { title: 'Living Arts Capital', text: 'Jaipur craftsmen continued ancient traditions while adapting to modern markets. Block printing, Blue Pottery, and Rajput jewellery found new international buyers.', items: ['Jawahar Kala Kendra — arts centre opened (1993)', 'Blue Pottery gets GI tag protection', 'Rajput miniature art in private galleries worldwide', 'Rajasthan film industry (Rajasthani cinema) grows'] },
        facts: [{ label: 'State Capital', value: 'Rajasthan (since 1949)' }, { label: 'UNESCO Site', value: 'Jaipur Old City' }, { label: 'Population', value: '~2.3 Million (1991)' }, { label: 'Known for', value: 'Heritage tourism' }],
        quote: '"Jaipur gives you the feeling that royalty is not just history — it is alive and breathing in every stone." — Travel writer'
      },
      'modern': {
        history: { title: 'UNESCO World Heritage City', text: 'Jaipur was inscribed as a UNESCO World Heritage City in 2019, recognizing its exceptional urban planning. Today it is one of India\'s top tourism destinations and a growing IT hub.', items: ['UNESCO World Heritage City (2019)', 'Jaipur Literature Festival — world\'s largest free literary event', 'IT SEZs driving economic growth', 'Rajasthan\'s tourism revenue — ₹1 lakh crore+'] },
        culture: { title: 'Jaipur Literature Festival — Global Event', text: 'The Jaipur Literature Festival, held every January, attracts Nobel laureates, Booker Prize winners, and millions of readers. It has become the "greatest literary show on Earth."', items: ['JLF draws 500,000+ visitors annually', 'International artists perform at Jantar Mantar', 'Heritage walks and night markets revived', 'Elephant Festival and kite festival globally celebrated'] },
        food: { title: 'Culinary Tourism Capital', text: 'Jaipur has established itself as a culinary tourism capital. Cooking classes in heritage havelis, royal kitchen experiences, and street food tours are major attractions.', items: ['Royal kitchen cooking experiences', 'Jaipur street food trail — globally recommended', 'Organic Rajasthani produce tourism', 'Desert dining under the stars experiences'] },
        art: { title: 'Art, Gems & Craft Renaissance', text: 'Jaipur is the world\'s largest centre for cut coloured gemstones. The city\'s artisans have embraced digital markets while preserving ancient craft traditions.', items: ['World\'s largest coloured gemstone trading hub', 'Blue Pottery masters teach international students', 'Contemporary Rajasthani art at global museums', 'Digital block-print designs for global fashion'] },
        facts: [{ label: 'UNESCO', value: 'World Heritage City 2019' }, { label: 'Gem Trade', value: 'Largest coloured gems hub' }, { label: 'Annual Tourists', value: '3+ Million' }, { label: 'JLF Visitors', value: '500,000+' }],
        quote: '"Jaipur is a city where every gate tells a story, every wall holds a painting, and every street sells a jewel." — JLF founder'
      }
    }
  }
];

// ─── STATE ─────────────────────────────────────────────────────────────────────
let selectedEra = null;
let selectedLocation = null;
let activeTab = 'history';
let mapMarkers = {};
let map;

// ─── ERA CONFIG ────────────────────────────────────────────────────────────────
const ERA_CONFIG = {
  '18th': { label: '⚔️ 18th Century · 1700–1799', gradient: 'linear-gradient(90deg, #e8923a, #f5c842)', class: 'era-18th' },
  '19th': { label: '🏭 19th Century · 1800–1899', gradient: 'linear-gradient(90deg, #8b5cf6, #38d5f7)', class: 'era-19th' },
  '20th': { label: '🚀 20th Century · 1900–1999', gradient: 'linear-gradient(90deg, #38d5f7, #34d399)', class: 'era-20th' },
  'modern': { label: '💻 Modern Era · 2000–Present', gradient: 'linear-gradient(90deg, #34d399, #8b5cf6)', class: 'era-modern' }
};

// ─── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initMap();
  initLocationCards();
  document.getElementById('timeline-select').addEventListener('change', onEraChange);
});

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  const colors = ['#f5c842', '#8b5cf6', '#38d5f7', '#e05c84', '#34d399', '#e8923a'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 12}s;
      animation-delay: ${Math.random() * 12}s;
    `;
    container.appendChild(p);
  }
}

// ─── MAP ───────────────────────────────────────────────────────────────────────
function initMap() {
  map = L.map('map', {
    center: [22.5, 80.0],
    zoom: 5,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  LOCATIONS.forEach(loc => {
    const markerIcon = L.divIcon({
      className: '',
      html: `<div class="custom-marker pulse-marker" style="background: linear-gradient(135deg, ${loc.color}cc, ${loc.color}44); border-color: ${loc.color}88;">
               <div class="marker-inner">${loc.icon}</div>
             </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -38]
    });

    const marker = L.marker([loc.lat, loc.lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-title">${loc.icon} ${loc.name}</div>
        <div class="popup-sub">${loc.region}</div>
        <div style="margin-top:8px;font-size:0.76rem;color:#9d97c4;">Click to explore history ↗</div>
      `, { maxWidth: 220 });

    marker.on('click', () => onMarkerClick(loc));
    mapMarkers[loc.id] = marker;
  });
}

// ─── LOCATION CARDS ────────────────────────────────────────────────────────────
function initLocationCards() {
  const scroll = document.getElementById('locations-scroll');
  LOCATIONS.forEach(loc => {
    const card = document.createElement('div');
    card.className = 'loc-card';
    card.id = `loc-card-${loc.id}`;
    card.innerHTML = `
      <div class="loc-card-icon">${loc.icon}</div>
      <div class="loc-card-name">${loc.name}</div>
      <div class="loc-card-region">${loc.region}</div>
    `;
    card.addEventListener('click', () => {
      map.flyTo([loc.lat, loc.lng], 7, { duration: 1.5 });
      mapMarkers[loc.id].openPopup();
      onMarkerClick(loc);
    });
    scroll.appendChild(card);
  });
}

// ─── ERA CHANGE ────────────────────────────────────────────────────────────────
function onEraChange(e) {
  selectedEra = e.target.value || null;
  const badgeDot = document.querySelector('.badge-dot');
  const badgeLabel = document.getElementById('selected-era-label');

  // Remove old era classes
  Object.values(ERA_CONFIG).forEach(cfg => document.body.classList.remove(cfg.class));

  if (selectedEra) {
    const cfg = ERA_CONFIG[selectedEra];
    document.body.classList.add(cfg.class);
    badgeDot.classList.add('active');
    badgeLabel.textContent = cfg.label;
  } else {
    badgeDot.classList.remove('active');
    badgeLabel.textContent = 'Select an era to begin';
  }

  // Re-render info if a location is already selected
  if (selectedLocation) {
    renderInfo(selectedLocation);
  }
}

// ─── MARKER CLICK ─────────────────────────────────────────────────────────────
function onMarkerClick(loc) {
  if (!selectedEra) {
    // Shake the select box
    const sel = document.querySelector('.select-wrapper');
    sel.style.animation = 'none';
    sel.offsetHeight; // reflow
    sel.style.animation = 'shake 0.4s ease';
    showToast('⏳ Please select a timeline era first!');
    return;
  }

  selectedLocation = loc;

  // Update active card
  document.querySelectorAll('.loc-card').forEach(c => c.classList.remove('active-card'));
  const activeCard = document.getElementById(`loc-card-${loc.id}`);
  if (activeCard) { activeCard.classList.add('active-card'); activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }

  renderInfo(loc);

  // Close popup
  mapMarkers[loc.id].closePopup();
}

// ─── RENDER INFO ──────────────────────────────────────────────────────────────
function renderInfo(loc) {
  const eraData = loc.data[selectedEra];
  if (!eraData) return;

  const placeholder = document.getElementById('info-placeholder');
  const content = document.getElementById('info-content');

  placeholder.classList.add('hidden');
  content.classList.remove('hidden');
  content.classList.add('slide-in');
  setTimeout(() => content.classList.remove('slide-in'), 400);

  // Era badge
  const eraBadge = document.getElementById('info-era-badge');
  eraBadge.textContent = ERA_CONFIG[selectedEra].label;
  eraBadge.style.background = ERA_CONFIG[selectedEra].gradient;

  // Location header
  document.getElementById('location-icon').textContent = loc.icon;
  document.getElementById('info-location-name').textContent = loc.name;
  document.getElementById('info-location-region').textContent = loc.region;

  // Tabs content
  const tabs = ['history', 'culture', 'food', 'art'];
  tabs.forEach(tab => {
    const d = eraData[tab];
    const el = document.getElementById(`tab-content-${tab}`);
    el.innerHTML = `
      <h4>${d.title}</h4>
      <p>${d.text}</p>
      <ul>${d.items.map(item => `<li data-icon="🔹">${item}</li>`).join('')}</ul>
    `;
  });

  // Facts
  const factsGrid = document.getElementById('facts-grid');
  factsGrid.innerHTML = eraData.facts.map(f => `
    <div class="fact-item">
      <div class="fact-label">${f.label}</div>
      <div class="fact-value">${f.value}</div>
    </div>
  `).join('');

  // Quote
  document.getElementById('info-quote').textContent = eraData.quote;

  // Reset to history tab
  switchTab('history');
}

// ─── TAB SWITCHER ─────────────────────────────────────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  const tabs = ['history', 'culture', 'food', 'art'];
  tabs.forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
    document.getElementById(`tab-content-${t}`).classList.toggle('hidden', t !== tab);
  });
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(message) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: #1a1740; border: 1px solid rgba(139,92,246,0.5); color: #f0ecff;
    padding: 12px 24px; border-radius: 100px; font-size: 0.85rem; font-weight: 500;
    z-index: 9999; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: toastIn 0.3s ease forwards;
    font-family: 'Inter', sans-serif;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn { to { transform: translateX(-50%) translateY(0); opacity: 1; } }
    @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
  `;
  document.head.appendChild(style);

  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = '0.3s'; setTimeout(() => toast.remove(), 300); }, 2500);
}

// Expose tab switcher to global scope (called from HTML)
window.switchTab = switchTab;
