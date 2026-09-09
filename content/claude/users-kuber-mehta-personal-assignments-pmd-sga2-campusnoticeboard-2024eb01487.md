---
title: "mac Personal Assignments PMD SGA2 CampusNoticeBoard 2024eb01487"
---

_1 transcript files aggregated._

does this include everything? Points to note: 
➢ Include a comment section with your ID in each source file 
➢ In every screenshot, your ID must be visible.  
➢ Assume  any  missing  information  necessary  to  maintain  a  logical  flow  in  your 
application. 

The Campus Notice Board App allows staff members to publish notices and students to 
view  published  notices.  The  application  demonstrates  Firebase  Authentication  for  user  registration and login, Shared Preferences for session management, Firebase Realtime 
Database for cloud storage, activity navigation, role-based access control, and Android 
Services for background notifications. This project is designed to introduce core Android 
development  concepts  such  as  authentication,  cloud  database  integration,  persistent 
storage, and background task automation. 

Question A: User Authentication with Shared Preferences (3 Marks) 

Implement  a  registration  and  login  system  using  Firebase  Authentication  and  Shared 
Preferences. 

• Create a RegisterActivity with the following: 

o An EditText for Email 
o An EditText for Password 
o A dropdown (Spinner) with values:  
▪ Staff  
▪ Student 
o A button named “Register” 
o A label/link to start LoginActivity 

• LoginActivity should contain: 

o Email (TextView and EditText) 
o Password (TextView and EditText) 
o Login Button 

• On Click of Register Button: 

o Check  for  Network  Connectivity  in  the  device.  If  connectivity  is  available, 
proceed  further;  otherwise,  display  a  popup  or  toast  message  asking  the 
user to connect to the internet. 
o Register the user using Firebase Authentication with 
createUserWithEmailAndPassword(). 
o Display a toast message: “Account Created Successfully” 

• On click of the Login link, LoginActivity should be displayed. 
• After entering the Email and Password, click on the Login button. 
• Authenticate the user using signInWithEmailAndPassword(). 
• Save  the  Email  and  Role  (Staff/Student)  in  Shared  Preferences  when  Login  is 
successful. 
• Navigate to a second screen (WelcomeActivity) that displays: 

“Welcome, [Email]” 
“Role: [Staff/Student]” 

• WelcomeActivity should contain a Logout button. 
• On click of Logout: 

o Shared Preferences should be cleared. 
o Firebase user should be signed out. 
o RegisterActivity should be displayed. 

Deliverables: 

• Source code for RegisterActivity, LoginActivity, and WelcomeActivity. 
• Preparing Screenshots of RegisterActivity, LoginActivity, and WelcomeActivity.
(will be taken by the user, DO NOT take it, just mention the path of where and how to take it)
 
Question B: Publishing and Displaying Notices Using Firebase (7 Marks) 

Allow  authenticated  users  to  publish  and  retrieve  notices  using  Firebase  Realtime 
Database. 

• Check for Network Connectivity before any Firebase operation. 
• If connectivity is not available, display an appropriate popup or toast message. 

Make a subfolder when you're done including:
RegisterActivity.java or RegisterActivity.kt, LoginActivity.java or LoginActivity.kt, WelcomeActivity.java or WelcomeActivity.kt, Service implementation file, XML layout files, and Firebase integration code

- aidocs: Use whenever the user mentions aidocs, an aidocs URL, an aidocs document/folder/comment/share/version, or asks to publish, review, open, or update a long-form artifact in aidocs.
- browse: Fast web browsing for Claude Code via persistent headless Chromium daemon. Navigate to any URL,
read page content, click elements, fill forms, run JavaScript, take screenshots,
inspect CSS/DOM, capture console/network logs, and more. ~100ms per command after
first call. Use when you need to check a website, verify a deployment, read docs,
or interact with any web page. No MCP, no Chrome extension — just fast CLI.
- day0-idea-submission: Use when a Day 0 / DayZero hackathon participant wants to brainstorm, draft, check, or submit their hackathon idea. Triggers on "submit my idea", "help me write my hackathon idea", "day0 idea", "idea submission", "brainstorm hackathon idea", or resubmission after screener feedback.
- graphify: Use for any question about a codebase, its architecture, file relationships, or project content — especially when graphify-out/ exists, where the question should be treated as a graphify query first. Turns any input (code, docs, papers, images, videos) into a persistent knowledge graph with god nodes, community detection, and query/path/explain tools.
- gstack: Fast web browsing for Claude Code via persistent headless Chromium daemon. Navigate to any URL,
read page content, click elements, fill forms, run JavaScript, take screenshots,
inspect CSS/DOM, capture console/network logs, and more. ~100ms per command after
first call. Use when you need to check a website, verify a deployment, read docs,
or interact with any web page. No MCP, no Chrome extension — just fast CLI.
- pdf-inspector: Read, classify, and convert PDF files to Markdown locally in ~10-200ms using Firecrawl's pdf-inspector Rust library — no OCR service, no network, no ML models. Use whenever a task involves reading, extracting, summarizing, or converting a PDF file. Classifies text-based vs scanned first, so scanned pages get routed to OCR instead of silently coming back empty.
- plan-ceo-review: CEO/founder-mode plan review. Rethink the problem, find the 10-star product,
challenge premises, expand scope when it creates a better product. Three modes:
SCOPE EXPANSION (dream big), HOLD SCOPE (maximum rigor), SCOPE REDUCTION
(strip to essentials).
- plan-eng-review: Eng manager-mode plan review. Lock in the execution plan — architecture,
data flow, diagrams, edge cases, test coverage, performance. Walks through
issues interactively with opinionated recommendations.
- retro: Weekly engineering retrospective. Analyzes commit history, work patterns,
and code quality metrics with persistent history and trend tracking.
- review: Pre-landing PR review. Analyzes diff against main for SQL safety, LLM trust
boundary violations, conditional side effects, and other structural issues.
- security-guidance: Fetch and apply Seezo's organization security guidance before making a security-relevant design or implementation decision. Use during exploration, creation, revision, or review of a design, spec, PR, or code change involving authentication or authorization, tenant or data isolation, untrusted input or file handling, external or third-party calls, secrets or sensitive data, or an API boundary—even before a document or code exists.
- ship: Ship workflow: merge main, run tests, review diff, bump VERSION, update CHANGELOG, commit, push, create PR.
- subagentmaxxing: Spawn and control non-Claude coding-agent subagents (OpenAI Codex CLI and Cursor CLI — grok-4.5, composer-2.5, gpt-5.5) as one-prompt-in/one-answer-out subagents via the `subagent` CLI. Use when you want to offload a task to a Codex or Cursor subagent, get a second opinion from a different model family, run cross-model consensus, or fan one prompt out across several models in parallel. - Also for reaching Cursor-hosted Opus/Sonnet/Gemini, or any time you specifically want a non-Claude model instead of the native Agent tool.
- vpsmaxxing: Set up and manage a personal cloud VPS as a dedicated remote workbench for AI coding agents (Claude Code + OpenAI Codex). Covers provisioning (git/node/pnpm/docker/tmux), installing & authenticating the agents, a self-aware agent environment, Tailscale networking (SSH with no exposed ports), a tmux + cmux cockpit, localhost port tunneling, reverse VPS→laptop file access (including a no-admin path for managed/work laptops), one-time migration of your skills/memory/history/credentials, and automatic two-way sync. Use this when the user wants to run AI agents on a server, offload heavy or parallel agent work off their laptop, "set up a VPS for Claude Code / Codex", spin up a remote agent box, or keep an agent setup synced across machines.
- youtube-transcript: Extract transcripts from YouTube videos. Use when the user asks for a transcript, subtitles, or captions of a YouTube video and provides a YouTube URL (youtube.com/watch?v=, youtu.be/, or similar). Supports output with or without timestamps.
- dataviz: Use this skill whenever you are about to create ANY chart, graph, plot, dashboard, or data visualization, in ANY output medium — an HTML or React artifact, inline SVG, plotting code in any library (matplotlib, plotly, d3, Recharts, …), an image/PNG you will render and upload, or a chart shared into Slack. Read it BEFORE writing the first line of chart code, choosing chart colors, building a stat tile / meter / KPI row, or laying out a dashboard. Produces visualizations that read as one system — elegant, accessible, consistent in light and dark — using a brand-neutral placeholder palette you swap for your own. Teaches a design-system-agnostic method: a form heuristic, a color formula with a runnable validator, mark specs, and interaction rules. A validated default palette is documented in `references/palette.md` — swap that file's values for your brand's. Triggers on: "chart", "graph", "plot", "data viz", "visualization", "dashboard", "analytics", "visualize data", "categorical colors", "sequential / diverging palette", "stat tile", "sparkline", "heatmap", "legend", "axis", "tooltip", "chart colors", "color by series".
- artifact-design: Design guidance and fundamentals for Artifacts.
- artifact-capabilities: Runtime capabilities a published Artifact page can be granted — behavior static HTML cannot provide on its own, such as the page reading live or connected data, keeping state shared across viewers, or updating and republishing itself. Serves this user's live capability roster and the typed call definitions. Load it whenever the user asks for an artifact needing any such runtime behavior.
- update-config: Use this skill to configure the Claude Code harness via settings.json. Automated behaviors ("from now on when X", "each time X", "whenever X", "before/after X") require hooks configured in settings.json - the harness executes these, not Claude, so memory/preferences cannot fulfill them. Also use for: permissions ("allow X", "add permission", "move permission to"), env vars ("set X=Y"), hook troubleshooting, or any changes to settings.json/settings.local.json files. Examples: "allow npm commands", "add bq permission to global settings", "move permission to user settings", "set DEBUG=true", "when claude stops show X". For simple settings like theme/model, suggest the /config command.
- keybindings-help: Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".
- simplify: Review the changed code for reuse, simplification, efficiency, and altitude cleanups, then apply the fixes. Quality only — it does not hunt for bugs; use /code-review for that.
- fewer-permission-prompts: Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project .claude/settings.json to reduce permission prompts.
- loop: Run a prompt or slash command on a recurring interval (e.g. /loop 5m /foo). Omit the interval to let the model self-pace. - When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- schedule: Create, update, list, or run scheduled cloud agents (routines) that execute on a cron schedule. - When the user wants to schedule a recurring cloud agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/routines. Also use when the user wants a one-time scheduled run ("run this once at 3pm", "remind me to check X tomorrow").
- claude-api: Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration.
TRIGGER — read BEFORE opening the target file; don't skip because it "looks like a one-liner" — whenever: the prompt names Claude/Anthropic in any form (Claude, Anthropic, Fable, Opus, Sonnet, Haiku, `anthropic`, `@anthropic-ai`, `claude-*`, `us.anthropic.*`, `[1m]`); the user asks about an LLM (pricing/model choice/limits/caching) — never answer from memory; OR the task is LLM-shaped with provider unstated (agent/MCP/tool-definition/multi-agent/RAG/LLM-judge/computer-use; generate/summarize/extract/classify/rewrite/converse over NL; debugging refusals/cutoffs/streaming/tool-calls/tokens).
SKIP only when another provider is being worked on (overrides all triggers): OpenAI/GPT/Gemini/Llama/Mistral/Cohere/Ollama named in the query; OR `grep -rE 'openai|langchain_openai|google.generativeai|genai|mistralai|cohere|ollama'` over the project hits (run this grep FIRST if no provider named — don't Read the file).
- run: Launch and drive this project's app to see a change working. Use when asked to run, start, or screenshot the app, or to confirm a change works in the real app (not just tests). First looks for a project skill that already covers launching the app; otherwise falls back to built-in patterns per project type (CLI, server, TUI, Electron, browser-driven, library).
- init: Initialize a new CLAUDE.md file with codebase documentation
- security-review: Complete a security review of the pending changes on the current branch

I'll start by exploring the current state of the working directory to understand what already exists.

/Users/kuber.mehta/Personal-Assignments/PMD-SGA2/CampusNoticeBoard_2024eb01487
---CONTENTS---
total 2728
drwxr-xr-x@ 15 kuber.mehta  staff     480 Jul 22 20:46 .
drwxr-xr-x   9 kuber.mehta  staff     288 Aug  9 03:35 ..
-rw-r--r--@  1 kuber.mehta  staff    6148 Jul 22 20:46 .DS_Store
-rw-r--r--@  1 kuber.mehta  staff    2804 Jul 22 20:45 AddNoticeActivity.kt
-rw-r--r--@  1 kuber.mehta  staff    3670 Jul 22 20:45 LoginActivity.kt
-rw-r--r--@  1 kuber.mehta  staff     640 Jul 22 20:45 NetworkUtils.kt
-rw-r--r--@  1 kuber.mehta  staff     189 Jul 22 20:45 Notice.kt
-rw-r--r--@  1 kuber.mehta  staff    3477 Jul 22 20:45 NoticeListActivity.kt
-rw-r--r--@  1 kuber.mehta  staff    3591 Jul 22 20:45 NoticeService.kt
-rw-r--r--@  1 kuber.mehta  staff  729754 Jul 22 20:45 PMD-SGA2-2024eb01487.docx
-rw-r--r--@  1 kuber.mehta  staff  622235 Jul 22 20:43 PMD-SGA2-2024eb01487.pdf
-rw-r--r--@  1 kuber.mehta  staff    3878 Jul 22 20:45 RegisterActivity.kt
-rw-r--r--@  1 kuber.mehta  staff    2824 Jul 22 20:45 WelcomeActivity.kt
drwxr-xr-x@  6 kuber.mehta  staff     192 Jul 22 20:07 firebase
drwxr-xr-x@ 10 kuber.mehta  staff     320 Jul 22 20:46 layouts
---RECURSIVE (max 3 levels)---
.
./WelcomeActivity.kt
./PMD-SGA2-2024eb01487.pdf
./.DS_Store
./RegisterActivity.kt
./firebase
./PMD-SGA2-2024eb01487.docx
./layouts
./AddNoticeActivity.kt
./NoticeService.kt
./LoginActivity.kt
./NetworkUtils.kt
./Notice.kt
./NoticeListActivity.kt
./firebase/root-build.gradle.kts
./firebase/AndroidManifest.xml
./firebase/google-services.json
./firebase/app-build.gradle.kts
./layouts/activity_add_notice.xml
./layouts/.DS_Store
./layouts/activity_login.xml
./layouts/notice_list_item.xml
./layouts/activity_register.xml
./layouts/values
./layouts/activity_notice_list.xml
./layouts/activity_welcome.xml
./layouts/values/colors.xml
./layouts/values/styles.xml
./layouts/values/strings.xml

There's already an existing implementation. The user is asking whether it covers everything in the assignment. Let me read the assignment PDF (to get the full Question B, which is truncated in your message) and all the existing source files.

## <u>Programming Mobile Devices</u>

## <u>Staff Graded Assignment - 2</u>

Kuber Mehta - 2024eb01487 (android emulator looks different because had to run the app in MacOS because I was travelling) Screenshots:

1	package com.example.campusnoticeboard2024eb01487
2	
3	import android.app.Activity
4	import android.content.Intent
5	import android.os.Bundle
6	import android.widget.ArrayAdapter
7	import android.widget.Button
8	import android.widget.EditText
9	import android.widget.Spinner
10	import android.widget.TextView
11	import android.widget.Toast
12	import com.google.firebase.auth.FirebaseAuth
13	import com.google.firebase.database.FirebaseDatabase
14	
15	class RegisterActivity : Activity() {
16	
17	    private lateinit var auth: FirebaseAuth
18	    private lateinit var editTextEmail: EditText
19	    private lateinit var editTextPassword: EditText
20	    private lateinit var spinnerRole: Spinner
21	
22	    override fun onCreate(savedInstanceState: Bundle?) {
23	        super.onCreate(savedInstanceState)
24	
25	        // Session management: if a user is already logged in (saved in Shared
26	        // Preferences), skip straight to the Welcome screen.
27	        val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
28	        if (prefs.getString("email", null) != null) {
29	            startActivity(Intent(this, WelcomeActivity::class.java))
30	            finish()
31	            return
32	        }
33	
34	        setContentView(R.layout.activity_register)
35	
36	        auth = FirebaseAuth.getInstance()
37	        editTextEmail = findViewById(R.id.editTextEmail)
38	        editTextPassword = findViewById(R.id.editTextPassword)
39	        spinnerRole = findViewById(R.id.spinnerRole)
40	
41	        // Spinner with the two roles: Staff and Student
42	        val roles = arrayOf("Staff", "Student")
43	        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, roles)
44	        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
45	        spinnerRole.adapter = adapter
46	
47	        findViewById<Button>(R.id.buttonRegister).setOnClickListener {
48	            registerUser()
49	        }
50	
51	        findViewById<TextView>(R.id.textLoginLink).setOnClickListener {
52	            startActivity(Intent(this, LoginActivity::class.java))
53	        }
54	    }
55	
56	    private fun registerUser() {
57	        val email = editTextEmail.text.toString().trim()
58	        val password = editTextPassword.text.toString().trim()
59	        val role = spinnerRole.selectedItem.toString()
60	
61	        if (email.isEmpty() || password.isEmpty()) {
62	            Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
63	            return
64	        }
65	
66	        // Check network connectivity before calling Firebase
67	        if (!NetworkUtils.isNetworkAvailable(this)) {
68	            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
69	            return
70	        }
71	
72	        auth.createUserWithEmailAndPassword(email, password)
73	            .addOnCompleteListener(this) { task ->
74	                if (task.isSuccessful) {
75	                    val uid = auth.currentUser?.uid
76	                    if (uid != null) {
77	                        // Save the role in the Realtime Database so it can be
78	                        // read back at login time.
79	                        val userMap = mapOf("email" to email, "role" to role)
80	                        FirebaseDatabase.getInstance().getReference("users")
81	                            .child(uid)
82	                            .setValue(userMap)
83	                            .addOnCompleteListener {
84	                                auth.signOut()
85	                                Toast.makeText(this, "Account Created Successfully", Toast.LENGTH_LONG).show()
86	                                startActivity(Intent(this, LoginActivity::class.java))
87	                            }
88	                    }
89	                } else {
90	                    Toast.makeText(
91	                        this,
92	                        "Registration Failed: " + task.exception?.message,
93	                        Toast.LENGTH_LONG
94	                    ).show()
95	                }
96	            }
97	    }
98	}
99	

package com.example.campusnoticeboard2024eb01487

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.FirebaseDatabase

class RegisterActivity : Activity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var editTextEmail: EditText
    private lateinit var editTextPassword: EditText
    private lateinit var spinnerRole: Spinner

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Session management: if a user is already logged in (saved in Shared
        // Preferences), skip straight to the Welcome screen.
        val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
        if (prefs.getString("email", null) != null) {
            startActivity(Intent(this, WelcomeActivity::class.java))
            finish()
            return
        }

        setContentView(R.layout.activity_register)

        auth = FirebaseAuth.getInstance()
        editTextEmail = findViewById(R.id.editTextEmail)
        editTextPassword = findViewById(R.id.editTextPassword)
        spinnerRole = findViewById(R.id.spinnerRole)

        // Spinner with the two roles: Staff and Student
        val roles = arrayOf("Staff", "Student")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, roles)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerRole.adapter = adapter

        findViewById<Button>(R.id.buttonRegister).setOnClickListener {
            registerUser()
        }

        findViewById<TextView>(R.id.textLoginLink).setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }

    private fun registerUser() {
        val email = editTextEmail.text.toString().trim()
        val password = editTextPassword.text.toString().trim()
        val role = spinnerRole.selectedItem.toString()

        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
            return
        }

        // Check network connectivity before calling Firebase
        if (!NetworkUtils.isNetworkAvailable(this)) {
            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
            return
        }

        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val uid = auth.currentUser?.uid
                    if (uid != null) {
                        // Save the role in the Realtime Database so it can be
                        // read back at login time.
                        val userMap = mapOf("email" to email, "role" to role)
                        FirebaseDatabase.getInstance().getReference("users")
                            .child(uid)
                            .setValue(userMap)
                            .addOnCompleteListener {
                                auth.signOut()
                                Toast.makeText(this, "Account Created Successfully", Toast.LENGTH_LONG).show()
                                startActivity(Intent(this, LoginActivity::class.java))
                            }
                    }
                } else {
                    Toast.makeText(
                        this,
                        "Registration Failed: " + task.exception?.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
    }
}


1	package com.example.campusnoticeboard2024eb01487
2	
3	import android.app.Activity
4	import android.content.Intent
5	import android.os.Bundle
6	import android.widget.Button
7	import android.widget.EditText
8	import android.widget.Toast
9	import com.google.firebase.auth.FirebaseAuth
10	import com.google.firebase.database.DataSnapshot
11	import com.google.firebase.database.DatabaseError
12	import com.google.firebase.database.FirebaseDatabase
13	import com.google.firebase.database.ValueEventListener
14	
15	// 2024eb01487
16	// saves the Email and Role in Shared Preferences for good practices while doing session management.
17	class LoginActivity : Activity() {
18	
19	    private lateinit var auth: FirebaseAuth
20	    private lateinit var editTextEmail: EditText
21	    private lateinit var editTextPassword: EditText
22	
23	    override fun onCreate(savedInstanceState: Bundle?) {
24	        super.onCreate(savedInstanceState)
25	        setContentView(R.layout.activity_login)
26	
27	        auth = FirebaseAuth.getInstance()
28	        editTextEmail = findViewById(R.id.editTextEmail)
29	        editTextPassword = findViewById(R.id.editTextPassword)
30	
31	        findViewById<Button>(R.id.buttonLogin).setOnClickListener {
32	            loginUser()
33	        }
34	    }
35	
36	    private fun loginUser() {
37	        val email = editTextEmail.text.toString().trim()
38	        val password = editTextPassword.text.toString().trim()
39	
40	        if (email.isEmpty() || password.isEmpty()) {
41	            Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
42	            return
43	        }
44	
45	        // Check network connectivity before calling Firebase
46	        if (!NetworkUtils.isNetworkAvailable(this)) {
47	            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
48	            return
49	        }
50	
51	        auth.signInWithEmailAndPassword(email, password)
52	            .addOnCompleteListener(this) { task ->
53	                if (task.isSuccessful) {
54	                    fetchRoleAndOpenWelcome(email)
55	                } else {
56	                    Toast.makeText(
57	                        this,
58	                        "Login Failed: " + task.exception?.message,
59	                        Toast.LENGTH_LONG
60	                    ).show()
61	                }
62	            }
63	    }
64	
65	    // The role was stored in the Realtime Database during registration.
66	    // Read it once, save Email + Role in Shared Preferences, then open Welcome.
67	    private fun fetchRoleAndOpenWelcome(email: String) {
68	        val uid = auth.currentUser?.uid ?: return
69	        FirebaseDatabase.getInstance().getReference("users")
70	            .child(uid)
71	            .child("role")
72	            .addListenerForSingleValueEvent(object : ValueEventListener {
73	                override fun onDataChange(snapshot: DataSnapshot) {
74	                    val role = snapshot.getValue(String::class.java) ?: "Student"
75	
76	                    val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
77	                    prefs.edit()
78	                        .putString("email", email)
79	                        .putString("role", role)
80	                        .apply()
81	
82	                    Toast.makeText(this@LoginActivity, "Login Successful", Toast.LENGTH_SHORT).show()
83	                    startActivity(Intent(this@LoginActivity, WelcomeActivity::class.java))
84	                    finish()
85	                }
86	
87	                override fun onCancelled(error: DatabaseError) {
88	                    Toast.makeText(
89	                        this@LoginActivity,
90	                        "Could not read user role: " + error.message,
91	                        Toast.LENGTH_LONG
92	                    ).show()
93	                }
94	            })
95	    }
96	}
97	

package com.example.campusnoticeboard2024eb01487

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener

// 2024eb01487
// saves the Email and Role in Shared Preferences for good practices while doing session management.
class LoginActivity : Activity() {

    private lateinit var auth: FirebaseAuth
    private lateinit var editTextEmail: EditText
    private lateinit var editTextPassword: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        auth = FirebaseAuth.getInstance()
        editTextEmail = findViewById(R.id.editTextEmail)
        editTextPassword = findViewById(R.id.editTextPassword)

        findViewById<Button>(R.id.buttonLogin).setOnClickListener {
            loginUser()
        }
    }

    private fun loginUser() {
        val email = editTextEmail.text.toString().trim()
        val password = editTextPassword.text.toString().trim()

        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please enter email and password", Toast.LENGTH_SHORT).show()
            return
        }

        // Check network connectivity before calling Firebase
        if (!NetworkUtils.isNetworkAvailable(this)) {
            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
            return
        }

        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    fetchRoleAndOpenWelcome(email)
                } else {
                    Toast.makeText(
                        this,
                        "Login Failed: " + task.exception?.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
    }

    // The role was stored in the Realtime Database during registration.
    // Read it once, save Email + Role in Shared Preferences, then open Welcome.
    private fun fetchRoleAndOpenWelcome(email: String) {
        val uid = auth.currentUser?.uid ?: return
        FirebaseDatabase.getInstance().getReference("users")
            .child(uid)
            .child("role")
            .addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    val role = snapshot.getValue(String::class.java) ?: "Student"

                    val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
                    prefs.edit()
                        .putString("email", email)
                        .putString("role", role)
                        .apply()

                    Toast.makeText(this@LoginActivity, "Login Successful", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this@LoginActivity, WelcomeActivity::class.java))
                    finish()
                }

                override fun onCancelled(error: DatabaseError) {
                    Toast.makeText(
                        this@LoginActivity,
                        "Could not read user role: " + error.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            })
    }
}


1	package com.example.campusnoticeboard2024eb01487
2	
3	import android.Manifest
4	import android.app.Activity
5	import android.content.Intent
6	import android.content.pm.PackageManager
7	import android.os.Build
8	import android.os.Bundle
9	import android.view.View
10	import android.widget.Button
11	import android.widget.TextView
12	import com.google.firebase.auth.FirebaseAuth
13	
14	class WelcomeActivity : Activity() {
15	
16	    override fun onCreate(savedInstanceState: Bundle?) {
17	        super.onCreate(savedInstanceState)
18	
19	        val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
20	        val email = prefs.getString("email", null)
21	        val role = prefs.getString("role", "Student")
22	
23	        // If there is no saved session, go back to the Register screen.
24	        if (email == null) {
25	            startActivity(Intent(this, RegisterActivity::class.java))
26	            finish()
27	            return
28	        }
29	
30	        setContentView(R.layout.activity_welcome)
31	
32	        findViewById<TextView>(R.id.textWelcome).text = "Welcome, \$email"
33	        findViewById<TextView>(R.id.textRole).text = "Role: \$role"
34	
35	        // Role-based access control: only Staff can publish notices.
36	        val buttonPublishNotice = findViewById<Button>(R.id.buttonPublishNotice)
37	        buttonPublishNotice.visibility = if (role == "Staff") View.VISIBLE else View.GONE
38	        buttonPublishNotice.setOnClickListener {
39	            startActivity(Intent(this, AddNoticeActivity::class.java))
40	        }
41	
42	        findViewById<Button>(R.id.buttonViewNotices).setOnClickListener {
43	            startActivity(Intent(this, NoticeListActivity::class.java))
44	        }
45	
46	        findViewById<Button>(R.id.buttonLogout).setOnClickListener {
47	            logoutUser(prefs)
48	        }
49	
50	        // Notifications need a runtime permission from Android 13 onwards.
51	        requestNotificationPermissionIfNeeded()
52	
53	        // Start the background service that listens for new notices.
54	        startService(Intent(this, NoticeService::class.java))
55	    }
56	
57	    private fun logoutUser(prefs: android.content.SharedPreferences) {
58	        // Clear Shared Preferences, sign out of Firebase and stop the service.
59	        prefs.edit().clear().apply()
60	        FirebaseAuth.getInstance().signOut()
61	        stopService(Intent(this, NoticeService::class.java))
62	
63	        val intent = Intent(this, RegisterActivity::class.java)
64	        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
65	        startActivity(intent)
66	        finish()
67	    }
68	
69	    private fun requestNotificationPermissionIfNeeded() {
70	        if (Build.VERSION.SDK_INT >= 33 &&
71	            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
72	        ) {
73	            requestPermissions(arrayOf(Manifest.permission.POST_NOTIFICATIONS), 101)
74	        }
75	    }
76	}
77	

package com.example.campusnoticeboard2024eb01487

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import com.google.firebase.auth.FirebaseAuth

class WelcomeActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
        val email = prefs.getString("email", null)
        val role = prefs.getString("role", "Student")

        // If there is no saved session, go back to the Register screen.
        if (email == null) {
            startActivity(Intent(this, RegisterActivity::class.java))
            finish()
            return
        }

        setContentView(R.layout.activity_welcome)

        findViewById<TextView>(R.id.textWelcome).text = "Welcome, \$email"
        findViewById<TextView>(R.id.textRole).text = "Role: \$role"

        // Role-based access control: only Staff can publish notices.
        val buttonPublishNotice = findViewById<Button>(R.id.buttonPublishNotice)
        buttonPublishNotice.visibility = if (role == "Staff") View.VISIBLE else View.GONE
        buttonPublishNotice.setOnClickListener {
            startActivity(Intent(this, AddNoticeActivity::class.java))
        }

        findViewById<Button>(R.id.buttonViewNotices).setOnClickListener {
            startActivity(Intent(this, NoticeListActivity::class.java))
        }

        findViewById<Button>(R.id.buttonLogout).setOnClickListener {
            logoutUser(prefs)
        }

        // Notifications need a runtime permission from Android 13 onwards.
        requestNotificationPermissionIfNeeded()

        // Start the background service that listens for new notices.
        startService(Intent(this, NoticeService::class.java))
    }

    private fun logoutUser(prefs: android.content.SharedPreferences) {
        // Clear Shared Preferences, sign out of Firebase and stop the service.
        prefs.edit().clear().apply()
        FirebaseAuth.getInstance().signOut()
        stopService(Intent(this, NoticeService::class.java))

        val intent = Intent(this, RegisterActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }

    private fun requestNotificationPermissionIfNeeded() {
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissions(arrayOf(Manifest.permission.POST_NOTIFICATIONS), 101)
        }
    }
}


The PDF is mostly screenshots. Let me read the remaining source files, the Firebase config, and layouts to fully assess coverage.

1	package com.example.campusnoticeboard2024eb01487
2	
3	import android.app.Activity
4	import android.os.Bundle
5	import android.widget.Button
6	import android.widget.EditText
7	import android.widget.Toast
8	import com.google.firebase.database.FirebaseDatabase
9	
10	// 2024eb01487
11	// Firebase Realtime Database which we put the notices node.
12	class AddNoticeActivity : Activity() {
13	
14	    private lateinit var editTextNoticeTitle: EditText
15	    private lateinit var editTextNoticeMessage: EditText
16	    private var postedBy: String = ""
17	
18	    override fun onCreate(savedInstanceState: Bundle?) {
19	        super.onCreate(savedInstanceState)
20	
21	        val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
22	        val role = prefs.getString("role", "Student")
23	        postedBy = prefs.getString("email", "") ?: ""
24	
25	        // Role-based access control: only Staff can open this screen.
26	        if (role != "Staff") {
27	            Toast.makeText(this, "Only Staff can publish notices", Toast.LENGTH_LONG).show()
28	            finish()
29	            return
30	        }
31	
32	        setContentView(R.layout.activity_add_notice)
33	
34	        editTextNoticeTitle = findViewById(R.id.editTextNoticeTitle)
35	        editTextNoticeMessage = findViewById(R.id.editTextNoticeMessage)
36	
37	        findViewById<Button>(R.id.buttonPublish).setOnClickListener {
38	            publishNotice()
39	        }
40	    }
41	
42	    private fun publishNotice() {
43	        val title = editTextNoticeTitle.text.toString().trim()
44	        val message = editTextNoticeMessage.text.toString().trim()
45	
46	        if (title.isEmpty() || message.isEmpty()) {
47	            Toast.makeText(this, "Please enter notice title and message", Toast.LENGTH_SHORT).show()
48	            return
49	        }
50	
51	        // Check network connectivity before the Firebase operation
52	        if (!NetworkUtils.isNetworkAvailable(this)) {
53	            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
54	            return
55	        }
56	
57	        val noticesRef = FirebaseDatabase.getInstance().getReference("notices")
58	        val key = noticesRef.push().key ?: return
59	        val notice = Notice(title, message, postedBy, System.currentTimeMillis())
60	
61	        noticesRef.child(key).setValue(notice)
62	            .addOnCompleteListener { task ->
63	                if (task.isSuccessful) {
64	                    Toast.makeText(this, "Notice Published Successfully", Toast.LENGTH_LONG).show()
65	                    editTextNoticeTitle.text.clear()
66	                    editTextNoticeMessage.text.clear()
67	                } else {
68	                    Toast.makeText(
69	                        this,
70	                        "Failed to publish notice: " + task.exception?.message,
71	                        Toast.LENGTH_LONG
72	                    ).show()
73	                }
74	            }
75	    }
76	}
77	

package com.example.campusnoticeboard2024eb01487

import android.app.Activity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.google.firebase.database.FirebaseDatabase

// 2024eb01487
// Firebase Realtime Database which we put the notices node.
class AddNoticeActivity : Activity() {

    private lateinit var editTextNoticeTitle: EditText
    private lateinit var editTextNoticeMessage: EditText
    private var postedBy: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val prefs = getSharedPreferences("CampusNoticeBoardPrefs", MODE_PRIVATE)
        val role = prefs.getString("role", "Student")
        postedBy = prefs.getString("email", "") ?: ""

        // Role-based access control: only Staff can open this screen.
        if (role != "Staff") {
            Toast.makeText(this, "Only Staff can publish notices", Toast.LENGTH_LONG).show()
            finish()
            return
        }

        setContentView(R.layout.activity_add_notice)

        editTextNoticeTitle = findViewById(R.id.editTextNoticeTitle)
        editTextNoticeMessage = findViewById(R.id.editTextNoticeMessage)

        findViewById<Button>(R.id.buttonPublish).setOnClickListener {
            publishNotice()
        }
    }

    private fun publishNotice() {
        val title = editTextNoticeTitle.text.toString().trim()
        val message = editTextNoticeMessage.text.toString().trim()

        if (title.isEmpty() || message.isEmpty()) {
            Toast.makeText(this, "Please enter notice title and message", Toast.LENGTH_SHORT).show()
            return
        }

        // Check network connectivity before the Firebase operation
        if (!NetworkUtils.isNetworkAvailable(this)) {
            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
            return
        }

        val noticesRef = FirebaseDatabase.getInstance().getReference("notices")
        val key = noticesRef.push().key ?: return
        val notice = Notice(title, message, postedBy, System.currentTimeMillis())

        noticesRef.child(key).setValue(notice)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "Notice Published Successfully", Toast.LENGTH_LONG).show()
                    editTextNoticeTitle.text.clear()
                    editTextNoticeMessage.text.clear()
                } else {
                    Toast.makeText(
                        this,
                        "Failed to publish notice: " + task.exception?.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
    }
}


1	package com.example.campusnoticeboard2024eb01487
2	
3	import android.app.Activity
4	import android.content.Context
5	import android.os.Bundle
6	import android.view.LayoutInflater
7	import android.view.View
8	import android.view.ViewGroup
9	import android.widget.ArrayAdapter
10	import android.widget.ListView
11	import android.widget.TextView
12	import android.widget.Toast
13	import com.google.firebase.database.DataSnapshot
14	import com.google.firebase.database.DatabaseError
15	import com.google.firebase.database.FirebaseDatabase
16	import com.google.firebase.database.ValueEventListener
17	import java.text.SimpleDateFormat
18	import java.util.Date
19	import java.util.Locale
20	
21	class NoticeListActivity : Activity() {
22	
23	    private val notices = ArrayList<Notice>()
24	    private lateinit var adapter: NoticeAdapter
25	    private val noticesRef = FirebaseDatabase.getInstance().getReference("notices")
26	    private var noticesListener: ValueEventListener? = null
27	
28	    override fun onCreate(savedInstanceState: Bundle?) {
29	        super.onCreate(savedInstanceState)
30	        setContentView(R.layout.activity_notice_list)
31	
32	        val listView = findViewById<ListView>(R.id.listViewNotices)
33	        adapter = NoticeAdapter(this, notices)
34	        listView.adapter = adapter
35	        listView.emptyView = findViewById(R.id.textEmpty)
36	
37	        // Check network connectivity before the Firebase operation
38	        if (!NetworkUtils.isNetworkAvailable(this)) {
39	            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
40	            return
41	        }
42	
43	        noticesListener = noticesRef.orderByChild("timestamp")
44	            .addValueEventListener(object : ValueEventListener {
45	                override fun onDataChange(snapshot: DataSnapshot) {
46	                    notices.clear()
47	                    for (child in snapshot.children) {
48	                        child.getValue(Notice::class.java)?.let { notices.add(it) }
49	                    }
50	                    notices.reverse() // latest notice on top
51	                    adapter.notifyDataSetChanged()
52	                }
53	
54	                override fun onCancelled(error: DatabaseError) {
55	                    Toast.makeText(
56	                        this@NoticeListActivity,
57	                        "Failed to load notices: " + error.message,
58	                        Toast.LENGTH_LONG
59	                    ).show()
60	                }
61	            })
62	    }
63	
64	    override fun onDestroy() {
65	        super.onDestroy()
66	        noticesListener?.let { noticesRef.removeEventListener(it) }
67	    }
68	
69	    // Simple adapter that shows title, message and posted-by details for a notice.
70	    private class NoticeAdapter(context: Context, items: ArrayList<Notice>) :
71	        ArrayAdapter<Notice>(context, 0, items) {
72	
73	        private val dateFormat = SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.getDefault())
74	
75	        override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
76	            val view = convertView ?: LayoutInflater.from(context)
77	                .inflate(R.layout.notice_list_item, parent, false)
78	            val notice = getItem(position)!!
79	
80	            view.findViewById<TextView>(R.id.textNoticeTitle).text = notice.title
81	            view.findViewById<TextView>(R.id.textNoticeMessage).text = notice.message
82	            view.findViewById<TextView>(R.id.textNoticeMeta).text =
83	                "By " + notice.postedBy + " on " + dateFormat.format(Date(notice.timestamp))
84	            return view
85	        }
86	    }
87	}
88	

package com.example.campusnoticeboard2024eb01487

import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import android.widget.Toast
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class NoticeListActivity : Activity() {

    private val notices = ArrayList<Notice>()
    private lateinit var adapter: NoticeAdapter
    private val noticesRef = FirebaseDatabase.getInstance().getReference("notices")
    private var noticesListener: ValueEventListener? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_notice_list)

        val listView = findViewById<ListView>(R.id.listViewNotices)
        adapter = NoticeAdapter(this, notices)
        listView.adapter = adapter
        listView.emptyView = findViewById(R.id.textEmpty)

        // Check network connectivity before the Firebase operation
        if (!NetworkUtils.isNetworkAvailable(this)) {
            Toast.makeText(this, "Please connect to the internet and try again", Toast.LENGTH_LONG).show()
            return
        }

        noticesListener = noticesRef.orderByChild("timestamp")
            .addValueEventListener(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    notices.clear()
                    for (child in snapshot.children) {
                        child.getValue(Notice::class.java)?.let { notices.add(it) }
                    }
                    notices.reverse() // latest notice on top
                    adapter.notifyDataSetChanged()
                }

                override fun onCancelled(error: DatabaseError) {
                    Toast.makeText(
                        this@NoticeListActivity,
                        "Failed to load notices: " + error.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            })
    }

    override fun onDestroy() {
        super.onDestroy()
        noticesListener?.let { noticesRef.removeEventListener(it) }
    }

    // Simple adapter that shows title, message and posted-by details for a notice.
    private class NoticeAdapter(context: Context, items: ArrayList<Notice>) :
        ArrayAdapter<Notice>(context, 0, items) {

        private val dateFormat = SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.getDefault())

        override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
            val view = convertView ?: LayoutInflater.from(context)
                .inflate(R.layout.notice_list_item, parent, false)
            val notice = getItem(position)!!

            view.findViewById<TextView>(R.id.textNoticeTitle).text = notice.title
            view.findViewById<TextView>(R.id.textNoticeMessage).text = notice.message
            view.findViewById<TextView>(R.id.textNoticeMeta).text =
                "By " + notice.postedBy + " on " + dateFormat.format(Date(notice.timestamp))
            return view
        }
    }
}


1	package com.example.campusnoticeboard2024eb01487
2	
3	import android.Manifest
4	import android.app.NotificationChannel
5	import android.app.NotificationManager
6	import android.app.Service
7	import android.content.Intent
8	import android.content.pm.PackageManager
9	import android.os.Build
10	import android.os.IBinder
11	import androidx.core.app.NotificationCompat
12	import androidx.core.app.NotificationManagerCompat
13	import com.google.firebase.database.ChildEventListener
14	import com.google.firebase.database.DataSnapshot
15	import com.google.firebase.database.DatabaseError
16	import com.google.firebase.database.DatabaseReference
17	import com.google.firebase.database.FirebaseDatabase
18	
19	class NoticeService : Service() {
20	
21	    private lateinit var noticesRef: DatabaseReference
22	    private var childEventListener: ChildEventListener? = null
23	    private var serviceStartTime: Long = 0L
24	
25	    override fun onCreate() {
26	        super.onCreate()
27	        serviceStartTime = System.currentTimeMillis()
28	        createNotificationChannel()
29	
30	        noticesRef = FirebaseDatabase.getInstance().getReference("notices")
31	        childEventListener = object : ChildEventListener {
32	            override fun onChildAdded(snapshot: DataSnapshot, previousChildName: String?) {
33	                val notice = snapshot.getValue(Notice::class.java) ?: return
34	                // Only notify for notices published after the service started,
35	                // so old notices do not raise notifications on every login.
36	                if (notice.timestamp > serviceStartTime) {
37	                    showNotification(notice)
38	                }
39	            }
40	
41	            override fun onChildChanged(snapshot: DataSnapshot, previousChildName: String?) {}
42	            override fun onChildRemoved(snapshot: DataSnapshot) {}
43	            override fun onChildMoved(snapshot: DataSnapshot, previousChildName: String?) {}
44	            override fun onCancelled(error: DatabaseError) {}
45	        }
46	        noticesRef.addChildEventListener(childEventListener!!)
47	    }
48	
49	    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
50	        return START_STICKY
51	    }
52	
53	    override fun onBind(intent: Intent?): IBinder? {
54	        return null
55	    }
56	
57	    override fun onDestroy() {
58	        childEventListener?.let { noticesRef.removeEventListener(it) }
59	        super.onDestroy()
60	    }
61	
62	    private fun createNotificationChannel() {
63	        if (Build.VERSION.SDK_INT >= 26) {
64	            val channel = NotificationChannel(
65	                CHANNEL_ID,
66	                "Campus Notices",
67	                NotificationManager.IMPORTANCE_DEFAULT
68	            )
69	            val manager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
70	            manager.createNotificationChannel(channel)
71	        }
72	    }
73	
74	    private fun showNotification(notice: Notice) {
75	        // On Android 13+ notifications need a runtime permission.
76	        if (Build.VERSION.SDK_INT >= 33 &&
77	            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
78	        ) {
79	            return
80	        }
81	
82	        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
83	            .setSmallIcon(android.R.drawable.ic_dialog_info)
84	            .setContentTitle("New Notice: " + notice.title)
85	            .setContentText(notice.message)
86	            .setSubText("2024eb01487")
87	            .setAutoCancel(true)
88	            .build()
89	
90	        NotificationManagerCompat.from(this).notify(notice.timestamp.toInt(), notification)
91	    }
92	
93	    companion object {
94	        private const val CHANNEL_ID = "campus_notice_channel"
95	    }
96	}
97	

package com.example.campusnoticeboard2024eb01487

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.firebase.database.ChildEventListener
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class NoticeService : Service() {

    private lateinit var noticesRef: DatabaseReference
    private var childEventListener: ChildEventListener? = null
    private var serviceStartTime: Long = 0L

    override fun onCreate() {
        super.onCreate()
        serviceStartTime = System.currentTimeMillis()
        createNotificationChannel()

        noticesRef = FirebaseDatabase.getInstance().getReference("notices")
        childEventListener = object : ChildEventListener {
            override fun onChildAdded(snapshot: DataSnapshot, previousChildName: String?) {
                val notice = snapshot.getValue(Notice::class.java) ?: return
                // Only notify for notices published after the service started,
                // so old notices do not raise notifications on every login.
                if (notice.timestamp > serviceStartTime) {
                    showNotification(notice)
                }
            }

            override fun onChildChanged(snapshot: DataSnapshot, previousChildName: String?) {}
            override fun onChildRemoved(snapshot: DataSnapshot) {}
            override fun onChildMoved(snapshot: DataSnapshot, previousChildName: String?) {}
            override fun onCancelled(error: DatabaseError) {}
        }
        noticesRef.addChildEventListener(childEventListener!!)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        childEventListener?.let { noticesRef.removeEventListener(it) }
        super.onDestroy()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= 26) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Campus Notices",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(channel)
        }
    }

    private fun showNotification(notice: Notice) {
        // On Android 13+ notifications need a runtime permission.
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle("New Notice: " + notice.title)
            .setContentText(notice.message)
            .setSubText("2024eb01487")
            .setAutoCancel(true)
            .build()

        NotificationManagerCompat.from(this).notify(notice.timestamp.toInt(), notification)
    }

    companion object {
        private const val CHANNEL_ID = "campus_notice_channel"
    }
}


1	package com.example.campusnoticeboard2024eb01487
2	
3	import android.content.Context
4	import android.net.ConnectivityManager
5	import android.net.NetworkCapabilities
6	
7	// 2024eb01487
8	object NetworkUtils {
9	
10	    fun isNetworkAvailable(context: Context): Boolean {
11	        val connectivityManager =
12	            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
13	        val network = connectivityManager.activeNetwork ?: return false
14	        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
15	        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
16	    }
17	}
18	

package com.example.campusnoticeboard2024eb01487

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities

// 2024eb01487
object NetworkUtils {

    fun isNetworkAvailable(context: Context): Boolean {
        val connectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return false
        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }
}


1	package com.example.campusnoticeboard2024eb01487
2	
3	data class Notice(
4	    var title: String = "",
5	    var message: String = "",
6	    var postedBy: String = "",
7	    var timestamp: Long = 0L
8	)
9	

package com.example.campusnoticeboard2024eb01487

data class Notice(
    var title: String = "",
    var message: String = "",
    var postedBy: String = "",
    var timestamp: Long = 0L
)


Now the Firebase config, manifest, and layout files.

1	<?xml version="1.0" encoding="utf-8"?>
2	<manifest xmlns:android="http://schemas.android.com/apk/res/android">
3	
4	    <uses-permission android:name="android.permission.INTERNET" />
5	    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
6	    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
7	
8	    <application
9	        android:allowBackup="true"
10	        android:label="@string/app_name"
11	        android:supportsRtl="true"
12	        android:theme="@style/AppTheme">
13	
14	        <activity
15	            android:name=".RegisterActivity"
16	            android:exported="true">
17	            <intent-filter>
18	                <action android:name="android.intent.action.MAIN" />
19	
20	                <category android:name="android.intent.category.LAUNCHER" />
21	            </intent-filter>
22	        </activity>
23	
24	        <activity
25	            android:name=".LoginActivity"
26	            android:exported="false" />
27	
28	        <activity
29	            android:name=".WelcomeActivity"
30	            android:exported="false" />
31	
32	        <activity
33	            android:name=".AddNoticeActivity"
34	            android:exported="false" />
35	
36	        <activity
37	            android:name=".NoticeListActivity"
38	            android:exported="false" />
39	
40	        <service
41	            android:name=".NoticeService"
42	            android:exported="false" />
43	    </application>
44	
45	</manifest>
46	

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:name=".RegisterActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".LoginActivity"
            android:exported="false" />

        <activity
            android:name=".WelcomeActivity"
            android:exported="false" />

        <activity
            android:name=".AddNoticeActivity"
            android:exported="false" />

        <activity
            android:name=".NoticeListActivity"
            android:exported="false" />

        <service
            android:name=".NoticeService"
            android:exported="false" />
    </application>

</manifest>
