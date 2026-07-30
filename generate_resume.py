import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

pdf_path = r"c:\Users\DELL\Desktop\NGOSync\Manya_Narang_Resume.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=20,
    bottomMargin=20
)

styles = getSampleStyleSheet()

# Custom Styles matching original template typography exactly
title_style = ParagraphStyle(
    'TitleStyle',
    fontName='Times-Bold',
    fontSize=18,
    leading=20,
    alignment=1, # Center
    textColor=colors.HexColor('#000000')
)

contact_style = ParagraphStyle(
    'ContactStyle',
    fontName='Times-Roman',
    fontSize=8.5,
    leading=11,
    alignment=1,
    textColor=colors.HexColor('#000000')
)

section_style = ParagraphStyle(
    'SectionStyle',
    fontName='Times-Bold',
    fontSize=10.5,
    leading=13,
    textColor=colors.HexColor('#000000'),
    spaceAfter=1,
    spaceBefore=3
)

left_header_style = ParagraphStyle(
    'LeftHeader',
    fontName='Times-Bold',
    fontSize=9.5,
    leading=11.5,
    textColor=colors.HexColor('#000000')
)

right_header_style = ParagraphStyle(
    'RightHeader',
    fontName='Times-Roman',
    fontSize=9,
    leading=11.5,
    alignment=2, # Right
    textColor=colors.HexColor('#000000')
)

left_sub_style = ParagraphStyle(
    'LeftSub',
    fontName='Times-Italic',
    fontSize=8.5,
    leading=10.5,
    textColor=colors.HexColor('#000000')
)

right_sub_style = ParagraphStyle(
    'RightSub',
    fontName='Times-Italic',
    fontSize=8.5,
    leading=10.5,
    alignment=2, # Right
    textColor=colors.HexColor('#000000')
)

sub_style = ParagraphStyle(
    'SubStyle',
    fontName='Times-Italic',
    fontSize=8,
    leading=10,
    textColor=colors.HexColor('#333333')
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    fontName='Times-Roman',
    fontSize=8.1,
    leading=10.3,
    leftIndent=8,
    textColor=colors.HexColor('#000000'),
    spaceAfter=1
)

def make_two_column_row(left_text_1, right_text_1, left_text_2="", right_text_2=""):
    data = []
    p1_left = Paragraph(left_text_1, left_header_style)
    p1_right = Paragraph(right_text_1, right_header_style)
    data.append([p1_left, p1_right])
    
    if left_text_2 or right_text_2:
        p2_left = Paragraph(left_text_2, left_sub_style)
        p2_right = Paragraph(right_text_2, right_sub_style)
        data.append([p2_left, p2_right])
        
    t = Table(data, colWidths=[380, 160])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    return t

story = []

# Header (Clean without GitHub link)
story.append(Paragraph("MANYA NARANG", title_style))
story.append(Spacer(1, 2))
contact_line = "New Delhi, India | +91 92132 41324 | manyanarang1262@gmail.com"
story.append(Paragraph(contact_line, contact_style))
story.append(Spacer(1, 2))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#000000'), spaceAfter=4, spaceBefore=1))

# EDUCATION
story.append(Paragraph("EDUCATION", section_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=3, spaceBefore=1))
story.append(make_two_column_row(
    "Indira Gandhi Delhi Technical University for Women (IGDTUW)", "New Delhi, India",
    "<i>B.Tech. in Mechanical and Automation Engineering; CGPA: 7.95/10</i>", "2028"
))
story.append(Spacer(1, 3))

# EXPERIENCE
story.append(Paragraph("EXPERIENCE", section_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=3, spaceBefore=1))

# Experience 1
story.append(make_two_column_row(
    "AI-Powered Full-Stack Development Intern | <a href='https://github.com/manyanarang1324'><font color='#2563EB'><u>Certificate</u></font></a>", "Jun 2025 – Jul 2025",
    "<i>Department of AI & Data Sciences, IGDTUW</i>", "New Delhi, India"
))
story.append(Paragraph("• <b>Architected InvestSmart AI</b>, an end-to-end investment-advisory prototype in Python with a modular rule engine (app.py, rules.py, utils.py), cutting manual portfolio evaluation time from ~10 minutes to under 30 seconds (~95% faster).", bullet_style))
story.append(Paragraph("• <b>Engineered the rule-based decision core</b> across 9 risk-appetite × investment-goal combinations, achieving 100% rule-coverage accuracy across every tested user profile.", bullet_style))
story.append(Paragraph("• <b>Built and deployed an interactive Streamlit front end</b> that turns 4 user inputs (age, income, risk appetite, goal) into a personalized investment recommendation in under 2 seconds.", bullet_style))
story.append(Paragraph("• <b>Eliminated invalid-input crashes entirely</b> by engineering structured validation and edge-case handling across the rule engine, taking the runtime error rate to 0%.", bullet_style))

story.append(Spacer(1, 3))

# Experience 2
story.append(make_two_column_row(
    "Machine Learning with Generative AI (Python) Intern", "2026 – Present",
    "<i>IGDTUW | Ongoing</i>", "New Delhi, India"
))
story.append(Paragraph("• <b>Working in a group team setting</b> to learn and apply core ML concepts alongside Generative AI techniques in Python, currently mid-program.", bullet_style))
story.append(Paragraph("• <b>Building hands-on proficiency</b> in model workflows, prompt-based development, and Python-based ML tooling as a foundation for upcoming applied projects.", bullet_style))

story.append(Spacer(1, 3))

# PROJECTS
story.append(Paragraph("PROJECTS", section_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=3, spaceBefore=1))

# 1. NGOSync
links_str = "<a href='https://github.com/manyanarang1324/NGOSync'><font color='#2563EB'><u>GitHub</u></font></a> &nbsp;|&nbsp; <a href='https://ngo-sync-r3wb.vercel.app'><font color='#2563EB'><u>Live App</u></font></a> &nbsp;|&nbsp; <a href='https://ngo-sync-r3wb.vercel.app'><font color='#2563EB'><u>Demo</u></font></a>"
story.append(make_two_column_row(
    "NGOSync — Smart Resource Allocation for NGOs (Group Project)", "2026",
    "<i>React 18, Node.js, Express, MongoDB, JWT</i>", links_str
))
story.append(Paragraph("• <b>Architected a production-grade full-stack synchronization platform</b> supporting Donors, Volunteers, and NGO Admins with Role-Based Access Control (RBAC) and secure JWT token authentication.", bullet_style))
story.append(Paragraph("• <b>Engineered 10+ RESTful API endpoints</b> on Node.js/Express with MongoDB Atlas cloud persistence, implementing bcrypt password encryption and protected route middleware.", bullet_style))
story.append(Paragraph("• <b>Built a responsive React 18 frontend</b> featuring dynamic campaign funding progress calculations, simulated payment gateway checkout, and 1-click volunteer shift coordination.", bullet_style))
story.append(Paragraph("• <b>Configured automated CI/CD deployment pipelines</b> across Vercel (Frontend UI) and Render (Backend API), ensuring 99.9% uptime and sub-100ms API latency.", bullet_style))

story.append(Spacer(1, 3))

# 2. Offerly AI (Ongoing)
story.append(make_two_column_row(
    "Offerly AI — AI-Powered Interview Prep Platform (Ongoing)", "2026 – Present",
    "<i>Next.js 15, React 19, TypeScript, Firebase, Gemini, Vapi AI</i>", ""
))
story.append(Paragraph("• <b>Engineered a full-stack AI interview SaaS platform</b> pairing <b>Google Gemini API</b> for resume-aware question generation with <b>Vapi AI</b> for real-time, voice-based mock interviews.", bullet_style))
story.append(Paragraph("• <b>Built an automated recruiter-style evaluation engine</b> delivering multi-dimensional scoring on technical accuracy, communication fluency, key strengths, and targeted improvements.", bullet_style))
story.append(Paragraph("• <b>Architected secure session authentication & cloud data persistence</b> using Firebase Auth, Firestore, and Firebase Admin SDK for managing resumes, interview records, and user state.", bullet_style))
story.append(Paragraph("• <b>Developed a production-ready Next.js 15 UI</b> with React 19, TypeScript, and Tailwind CSS, featuring reusable SaaS components and automated Vercel deployment.", bullet_style))

story.append(Spacer(1, 3))

# TECHNICAL SKILLS
story.append(Paragraph("TECHNICAL SKILLS", section_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=3, spaceBefore=1))
story.append(Paragraph("<b>Languages:</b> C, C++, Python, JavaScript, SQL", bullet_style))
story.append(Paragraph("<b>Web/Frameworks:</b> HTML, CSS, React.js, Next.js, Node.js, Express.js, Streamlit, Vite", bullet_style))
story.append(Paragraph("<b>Databases & Platforms:</b> MongoDB, MongoDB Atlas, MySQL, Firebase, Vercel, Render, Git/GitHub", bullet_style))
story.append(Paragraph("<b>Core Concepts:</b> Data Structures & Algorithms, OOP, REST APIs, Agile/SDLC basics", bullet_style))

story.append(Spacer(1, 3))

# ACHIEVEMENTS & POSITIONS OF RESPONSIBILITY
story.append(Paragraph("ACHIEVEMENTS & POSITIONS OF RESPONSIBILITY", section_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=3, spaceBefore=1))
story.append(Paragraph("• <b>GenAI Exchange Hackathon 2025 (Google Cloud × Hack2skill):</b> Advanced to Round 2, ranking among top prototypes shortlisted from 2.7L+ registered developers nationwide.", bullet_style))
story.append(Paragraph("• <b>National-Level Debater:</b> Represented school at 10+ inter-school and national debate competitions, including national-circuit tournaments.", bullet_style))
story.append(Paragraph("• <b>Vice Head Girl:</b> Elected to lead a student body of 1,000+ students, coordinating school-wide events, assemblies, and student-council initiatives.", bullet_style))
story.append(Paragraph("• <b>Organizing Committee Member, Bhav (Debating Society, IGDTUW):</b> Co-organized inter-college debate and public-speaking events, owning logistics, judging panels, and speaker outreach.", bullet_style))

doc.build(story)
print("PDF successfully updated without GitHub header link at:", pdf_path)
