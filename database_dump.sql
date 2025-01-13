--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: final_project_sorority; Type: SCHEMA; Schema: -; Owner: final_project_sorority
--

CREATE SCHEMA final_project_sorority;


ALTER SCHEMA final_project_sorority OWNER TO final_project_sorority;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: final_project_sorority; Owner: final_project_sorority
--

CREATE TABLE final_project_sorority.events (
    id integer NOT NULL,
    event_title character varying(500),
    event_description text,
    event_location character varying(500),
    event_date date NOT NULL,
    hosted_by character varying(500),
    event_image character varying(500),
    event_costs character varying(500),
    created_by integer
);


ALTER TABLE final_project_sorority.events OWNER TO final_project_sorority;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE final_project_sorority.events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_sorority.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations; Type: TABLE; Schema: final_project_sorority; Owner: final_project_sorority
--

CREATE TABLE final_project_sorority.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE final_project_sorority.migrations OWNER TO final_project_sorority;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: final_project_sorority; Owner: final_project_sorority
--

CREATE SEQUENCE final_project_sorority.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE final_project_sorority.migrations_id_seq OWNER TO final_project_sorority;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER SEQUENCE final_project_sorority.migrations_id_seq OWNED BY final_project_sorority.migrations.id;


--
-- Name: payment; Type: TABLE; Schema: final_project_sorority; Owner: final_project_sorority
--

CREATE TABLE final_project_sorority.payment (
    id integer NOT NULL,
    user_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    adress character varying(500) NOT NULL,
    zip_code integer NOT NULL,
    city character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    paypal character varying(500),
    credit_card integer NOT NULL,
    payment_status boolean
);


ALTER TABLE final_project_sorority.payment OWNER TO final_project_sorority;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE final_project_sorority.payment ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_sorority.payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rsvp; Type: TABLE; Schema: final_project_sorority; Owner: final_project_sorority
--

CREATE TABLE final_project_sorority.rsvp (
    id integer NOT NULL,
    user_id integer NOT NULL,
    event_id integer NOT NULL,
    rsvp_status boolean DEFAULT false
);


ALTER TABLE final_project_sorority.rsvp OWNER TO final_project_sorority;

--
-- Name: rsvp_id_seq; Type: SEQUENCE; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE final_project_sorority.rsvp ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_sorority.rsvp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sessions; Type: TABLE; Schema: final_project_sorority; Owner: final_project_sorority
--

CREATE TABLE final_project_sorority.sessions (
    id integer NOT NULL,
    token character varying(150) NOT NULL,
    expiry_timestamp timestamp without time zone DEFAULT (now() + '24:00:00'::interval) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE final_project_sorority.sessions OWNER TO final_project_sorority;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE final_project_sorority.sessions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_sorority.sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: final_project_sorority; Owner: final_project_sorority
--

CREATE TABLE final_project_sorority.users (
    id integer NOT NULL,
    password_hash character varying(100) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    occupation character varying(100),
    intro_text character varying(500),
    profile_picture character varying(200),
    email character varying(200) NOT NULL,
    linkedin character varying(200),
    is_admin boolean DEFAULT false
);


ALTER TABLE final_project_sorority.users OWNER TO final_project_sorority;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE final_project_sorority.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME final_project_sorority.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations id; Type: DEFAULT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.migrations ALTER COLUMN id SET DEFAULT nextval('final_project_sorority.migrations_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: final_project_sorority; Owner: final_project_sorority
--

COPY final_project_sorority.events (id, event_title, event_description, event_location, event_date, hosted_by, event_image, event_costs, created_by) FROM stdin;
24	THE: Care Workshop	Balancing family and career remains predominantly a women's issue in Austria. Too often, this challenge is reframed as a personal problem, despite the structural factors that make (work) life difficult for mothers and women*.\nIn an interactive workshop, we aim to delve deeper into this topic and support women and mothers in developing strategies for achieving a better balance between work and family. Together with Lisi Molzbichler, a mother of three herself, we will discuss various aspects of balancing responsibilities—maternity leave, re-entry into the workforce, and work-life blending—and focus on the themes that matter most to the participants. Through practical approaches, inspiring insights, and group exchanges, the goal is to gain new perspectives and practical tips for everyday life.\nAbout the Workshop Leader: Lisi Molzbichler is an inspiring entrepreneur, coach, and consultant, ranked among the top 15 coaches in Vienna and named one of the top 30 HR influencers of 2024. She is the founder of the Business Moms Austria network with over 2,000 members and the co-founder of balanceUP GmbH, which offers innovative solutions for integrating family, career, and personal development. The annual balanceUP Summit, featuring over 50 speakers and 800 participants, highlights Lisi's dedication to work-life balance and female leadership.	Cafe Siebenstern	2025-02-11	The Sorority	https://res.cloudinary.com/drhdyavyq/image/upload/v1732977666/eqmfw99mcdbmwzdedx97.jpg	Free for Members	\N
29	xxx	xxx	xxx	2024-12-02	xxx	https://res.cloudinary.com/drhdyavyq/image/upload/v1733156381/gf8w1ih9sb6rj0oekvoc.png	xxx	\N
30	TestEvent	TestEvent	TestEvent	2024-12-02	TestEvent	https://res.cloudinary.com/drhdyavyq/image/upload/v1733158698/mclqruvqhirsv36xx5wx.png	23	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: final_project_sorority; Owner: final_project_sorority
--

COPY final_project_sorority.migrations (id, name, created_at) FROM stdin;
105	00000-createTableUsers.ts	2024-11-28 21:17:26.04552
106	00001-insertTableUsers.ts	2024-11-28 21:17:26.04552
107	00002-createTableEvents.ts	2024-11-28 21:17:26.04552
108	00003-insertTableEvents.ts	2024-11-28 21:17:26.04552
109	00004-sessions.ts	2024-11-28 21:17:26.04552
110	00005-payment.ts	2024-11-28 21:17:26.04552
111	00006-rsvp.ts	2024-11-28 21:17:26.04552
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: final_project_sorority; Owner: final_project_sorority
--

COPY final_project_sorority.payment (id, user_id, first_name, last_name, adress, zip_code, city, country, paypal, credit_card, payment_status) FROM stdin;
\.


--
-- Data for Name: rsvp; Type: TABLE DATA; Schema: final_project_sorority; Owner: final_project_sorority
--

COPY final_project_sorority.rsvp (id, user_id, event_id, rsvp_status) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: final_project_sorority; Owner: final_project_sorority
--

COPY final_project_sorority.sessions (id, token, expiry_timestamp, user_id) FROM stdin;
31	1jxu18oMZP/jShQSMrQKPgQWdkHH+pxADfIxZHYT2mQN+a3OFFRzQdRyDFXVIxgStJdJoMlA5MJ3lRx1swFkpALqpJMSaUJO2V6DT4nCs4m3zz4hIJ8Tli+uBHbnfUTYS215Qw==	2024-12-02 11:30:12.7137	5
39	FGqBXwRp84q8e4CgT0iXXTdHnUt9LfybYolwHwUNaNz05vZFC6ZGVANNE/kVYNXlhI2ibBpy2wAR8EQtZiLIRdFyKBTjjt54kXD8O3WFsD63SjJXx8v8lzrNb0B8MiWk195TAg==	2024-12-20 13:40:10.104634	5
40	1nzMDg7arZcq43/3Aaq2rc+pvUYBUvpgdCx038rZApKipVapkCdJHgVzhBZzVDkdJkn4ojK/y6PDfgElHbXYJpRKO9viYx3ZUQxqye9s7wiaUGS7ChHBAEh7ji+Lw9iuo0LzpQ==	2025-01-14 19:09:30.327038	5
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: final_project_sorority; Owner: final_project_sorority
--

COPY final_project_sorority.users (id, password_hash, first_name, last_name, occupation, intro_text, profile_picture, email, linkedin, is_admin) FROM stdin;
1	1234567	Sara	Ela	designer	Hey this is my Intro	xxx	sara@email.com	linkedin.de	t
2	$2b$12$bFx7iDbvTshTtQoEoQ5CreVWt7nRwhrdvtdKh.bZeyVi7LUqnNp1q	Sara	El Abed	\N	\N	\N	sara@sorority.com	\N	f
17	$2b$12$exgVjTNbC7.wd0J86HQSAOb43g6NGrCW5VghZ6xbCgDnsGQzeIfBS	Sandra	Müller	\N	\N	\N	sandra@sorority.at	\N	f
6	$2b$12$R5c7GW2rMEiD63s9F925SOfb0IMT6h613co6EU4KhyqIVbhhZ5p4m	Sara	El Abed	\N	\N	\N	sara@sorority.at	\N	f
5	$2b$12$99NehJJuLIwUQx74oMNv0OtlccfDZsbTiFDlox3oBL1yWmvlviww6	Katja	Grafl	HR Manager	Grown up in Vienna's Margareten district, she often keeps her Burgenland roots under wraps. Her professional journey spans social work, something with media, and project management in various non-profits. Definitely more of a summer than a winter person and a long-time vegetarian.	https://res.cloudinary.com/drhdyavyq/image/upload/v1732872389/xelu0crqv3zj1xsiai41.jpg	katja@sorority.at		t
18	$2b$12$glR47AFjwkCol42yKaR10ex98dMdjLyKw95KtIpHnrEzYlqITjmGS	anton	anton	\N	\N	\N	anton@anton	\N	f
19	$2b$12$3Fhg39VNVgWpV5G.MWSUuuouA.qIi8BKLcZ406YvkQ1bG5T/ZArMW	Marie	Marie	\N	\N	\N	Marie@Marie	\N	f
16	$2b$12$lK7Xq0PMqxT0NAIQAYmKDufejyMcRU7W6HA6siKgYtLM8QXXEUrDG	Sara	El Abed	Web Developer	Hey there! Nice to meet you :) \n	https://res.cloudinary.com/drhdyavyq/image/upload/v1732975280/cepvxeyidzcimxwoubsh.webp	saraelabed@sorority.at	\N	f
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: final_project_sorority; Owner: final_project_sorority
--

SELECT pg_catalog.setval('final_project_sorority.events_id_seq', 30, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: final_project_sorority; Owner: final_project_sorority
--

SELECT pg_catalog.setval('final_project_sorority.migrations_id_seq', 111, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: final_project_sorority; Owner: final_project_sorority
--

SELECT pg_catalog.setval('final_project_sorority.payment_id_seq', 1, false);


--
-- Name: rsvp_id_seq; Type: SEQUENCE SET; Schema: final_project_sorority; Owner: final_project_sorority
--

SELECT pg_catalog.setval('final_project_sorority.rsvp_id_seq', 10, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: final_project_sorority; Owner: final_project_sorority
--

SELECT pg_catalog.setval('final_project_sorority.sessions_id_seq', 40, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: final_project_sorority; Owner: final_project_sorority
--

SELECT pg_catalog.setval('final_project_sorority.users_id_seq', 19, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- Name: rsvp rsvp_pkey; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.rsvp
    ADD CONSTRAINT rsvp_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: events events_created_by_fkey; Type: FK CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.events
    ADD CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES final_project_sorority.users(id) ON DELETE CASCADE;


--
-- Name: payment payment_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.payment
    ADD CONSTRAINT payment_user_id_fkey FOREIGN KEY (user_id) REFERENCES final_project_sorority.users(id) ON DELETE CASCADE;


--
-- Name: rsvp rsvp_event_id_fkey; Type: FK CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.rsvp
    ADD CONSTRAINT rsvp_event_id_fkey FOREIGN KEY (event_id) REFERENCES final_project_sorority.events(id) ON DELETE CASCADE;


--
-- Name: rsvp rsvp_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.rsvp
    ADD CONSTRAINT rsvp_user_id_fkey FOREIGN KEY (user_id) REFERENCES final_project_sorority.users(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: final_project_sorority; Owner: final_project_sorority
--

ALTER TABLE ONLY final_project_sorority.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES final_project_sorority.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

