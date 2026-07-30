import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

pdf_path = r"c:\Users\DELL\Desktop\NGOSync\Manya_Narang_ATS_Cover_Letter.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=45,
    rightMargin=45,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

# Standard ATS Executive Styles (Helvetica/Times-Roman, 100% ATS Readable)
name_style = ParagraphStyle(
    'ATSName',
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=22,
    textColor=colors.HexColor('#000000')
)

contact_style = ParagraphStyle(
    'ATSContact',
    fontName='Helvetica',
    fontSize=9.5,
    leading=13,
    textColor=colors.HexColor('#333333')
)

date_style = ParagraphStyle(
    'ATSDate',
    fontName='Helvetica',
    fontSize=9.5,
    leading=13,
    textColor=colors.HexColor('#111827')
)

subject_style = ParagraphStyle(
    'ATSSubject',
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=14,
    textColor=colors.HexColor('#000000')
)

body_style = ParagraphStyle(
    'ATSBody',
    fontName='Helvetica',
    fontSize=9.75,
    leading=14.5,
    textColor=colors.HexColor('#111827'),
    spaceAfter=9
)

bullet_style = ParagraphStyle(
    'ATSBullet',
    fontName='Helvetica',
    fontSize=9.5,
    leading=14,
    leftIndent=12,
    textColor=colors.HexColor('#111827'),
    spaceAfter=5
)

story = []

# Candidate ATS Header Block
story.append(Paragraph("MANYA NARANG", name_style))
story.append(Spacer(1, 3))
story.append(Paragraph("New Delhi, India | +91 92132 41324 | manyanarang1262@gmail.com | github.com/manyanarang1324", contact_style))
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#000000'), spaceAfter=12, spaceBefore=2))

# Date & Hiring Manager Block
story.append(Paragraph("July 27, 2026", date_style))
story.append(Spacer(1, 6))
story.append(Paragraph("To: Selection Committee / Software Engineering Hiring Team", date_style))
story.append(Spacer(1, 4))
story.append(Paragraph("RE: Application for Software Engineering / Technology Analyst Role", subject_style))
story.append(Spacer(1, 8))

# ATS Body Paragraphs
story.append(Paragraph("Dear Hiring Manager,", body_style))

p1 = ("I am writing to submit my application for the Software Engineering and Technology Analyst opportunities at your organization. "
      "As a B.Tech candidate in Mechanical & Automation Engineering at Indira Gandhi Delhi Technical University for Women (IGDTUW) with a 7.95/10 CGPA, "
      "I bring a strong foundation in full-stack software development, RESTful microservices architecture, AI system integration, and cloud persistence.")
story.append(Paragraph(p1, body_style))

p2 = ("My technical background encompasses hands-on experience building scalable, production-grade applications using modern web technologies:")
story.append(Paragraph(p2, body_style))

b1 = "• <b>NGOSync (Full-Stack Platform):</b> Architected a multi-role synchronization platform supporting Donors, Volunteers, and NGO Admins using React 18, Node.js, Express, and MongoDB Atlas. Engineered 10+ RESTful API endpoints with JWT authentication and configured automated production CI/CD pipelines on Vercel and Render."
story.append(Paragraph(b1, bullet_style))

b2 = "• <b>Offerly AI (Ongoing SaaS):</b> Developing an AI-driven interview preparation platform utilizing Next.js 15, React 19, TypeScript, and Firebase. Integrated Google Gemini API for resume-aware question generation and Vapi AI for real-time conversational voice mock interviews."
story.append(Paragraph(b2, bullet_style))

b3 = "• <b>InvestSmart AI (Internship Project):</b> Designed an investment-advisory prototype in Python with a modular rule engine (app.py, rules.py, utils.py), cutting manual evaluation time from ~10 minutes to under 30 seconds (~95% faster) with 100% rule-coverage accuracy."
story.append(Paragraph(b3, bullet_style))

p3 = ("Complementing my technical engineering capabilities, my recognized achievements as a <b>GenAI Exchange Hackathon Finalist (Google Cloud × Hack2skill)</b>—shortlisted among top prototypes nationwide out of 2.7L+ developers—and my leadership roles as a National-Level Debater and Vice Head Girl reflect my ability to communicate complex concepts, collaborate across cross-functional teams, and deliver results under tight timelines.")
story.append(Paragraph(p3, body_style))

p4 = ("I am eager to contribute my full-stack engineering skills, technical adaptability, and passion for reliable software systems to your engineering team. Thank you for your time and consideration.")
story.append(Paragraph(p4, body_style))

story.append(Spacer(1, 10))
story.append(Paragraph("Sincerely,<br/><br/><b>Manya Narang</b>", body_style))

doc.build(story)
print("ATS Cover Letter PDF successfully generated at:", pdf_path)
