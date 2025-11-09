const openaiService = require('./openaiService');

class CollabHireService {
  constructor() {
    this.openai = openaiService;
    
    // Professional formatting system prompt
    this.formattingRules = `
CRITICAL FORMATTING REQUIREMENTS:
You must always produce visually formatted and easy-to-scan outputs suitable for a professional AI recruiting dashboard.

Formatting Rules:
1. Use Markdown for all text formatting
2. Separate all sections with one blank line
3. Use bold headings (e.g., **Key Selling Points:**)
4. Use bullet points (–) for lists
5. Use numbered lists (1. 2. etc.) for ordered steps
6. Use italics for notes or placeholders (e.g., *insert candidate name*)
7. Never display text as one continuous block
8. Keep line length short and paragraphs concise
9. For structured data, use clean Markdown tables
10. Avoid code blocks or escape characters

Every output must look polished and professional – not a text dump.
`;
  }

  async chat(messages, options = {}) {
    const { recruiterType = 'internal' } = options;
    
    const systemPrompt = recruiterType === 'agency'
      ? `You are CollabHire, an AI recruitment assistant specialising in agency recruitment. You help recruiters find candidates for clients, manage client relationships, and optimise placement strategies. Use Australian English spelling and terminology.

${this.formattingRules}`
      : `You are CollabHire, an AI recruitment assistant specialising in internal/corporate recruitment. You help companies find and hire talent for their own teams, focusing on culture fit, internal mobility, and long-term employee development. Use Australian English spelling and terminology.

${this.formattingRules}`;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await this.openai.createChatCompletion(formattedMessages);
    return {
      success: true,
      content: response.content
    };
  }

  async generateSearchStrings(data) {
    const { jobTitle, location, skills, platforms, recruiterType } = data;
    
    const platformsList = platforms?.length ? platforms.join(', ') : 'LinkedIn';
    const skillsList = skills?.join(', ') || 'relevant skills';

    const userPrompt = `Create Boolean search strings for sourcing candidates on ${platformsList}.

**Job Title:** ${jobTitle}
**Location:** ${location}
**Key Skills:** ${skillsList}

For each platform (${platformsList}), provide:

**1. Basic Search String**
**2. Advanced Search String** (with Boolean operators)
**3. Platform-Specific Tips**

Format cleanly with clear headers and bullet points for each platform.`;

    return await this.chat([
      { role: 'user', content: userPrompt }
    ], { recruiterType });
  }

  async scoreCandidate(jobDescription, candidateProfile, recruiterType) {
    const userPrompt = `Score this candidate against the job requirements.

**JOB DESCRIPTION:**
${jobDescription}

**CANDIDATE PROFILE:**
${candidateProfile}

Provide a professional scorecard:

**1. Overall Fit Score:** [0-100]

**2. Skills Match Analysis**
– List matching skills
– Rate each skill match

**3. Experience Alignment**
– Years of relevant experience
– Industry fit
– Role progression

**4. Key Strengths**
– Top 3-5 strengths

**5. Gaps/Concerns**
– Missing qualifications
– Potential red flags

**6. Recommendation**
☐ Strong Yes ☐ Yes ☐ Maybe ☐ No

**7. Interview Focus Areas**
– Questions to ask
– Areas to probe deeper

Format as a clean, scannable scorecard.`;

    return await this.chat([
      { role: 'user', content: userPrompt }
    ], { recruiterType });
  }

  async generateOutreach(data) {
    const { candidateInfo, jobTitle, companyInfo, recruiterType } = data;
    
    const userPrompt = `Create a personalised outreach message for this candidate.

**Candidate:** ${candidateInfo}
**Role:** ${jobTitle}
${companyInfo ? `**Company:** ${companyInfo}` : ''}

Provide:

**1. Subject Line**
[Compelling subject]

**2. Initial Outreach Message** (LinkedIn/Email)
[Professional, personalised message]

**3. Follow-Up Message** (if no response after 1 week)
[Gentle follow-up]

**4. Key Selling Points to Emphasise:**
– Point 1
– Point 2
– Point 3

Keep it professional, personalised, and concise. Use Australian English.`;

    return await this.chat([
      { role: 'user', content: userPrompt }
    ], { recruiterType });
  }

  async generateScreeningQuestions(jobTitle, keySkills, recruiterType) {
    const skillsList = Array.isArray(keySkills) ? keySkills.join(', ') : keySkills;
    
    const userPrompt = `Create screening questions for this role:

**Job Title:** ${jobTitle}
**Focus:** ${skillsList}

Provide:

**1. Phone Screen Questions** (5 questions for quick assessment)
1. [Question]
2. [Question]
...

**2. Technical/Skill-Based Questions** (5 questions)
1. [Question]
2. [Question]
...

**3. Behavioural Questions** (3 questions)
1. [Question]
2. [Question]
3. [Question]

**4. What to Listen For**
– Strong answer indicators
– Red flags

Format with clear sections and numbered lists.`;

    return await this.chat([
      { role: 'user', content: userPrompt }
    ], { recruiterType });
  }

  async getMarketInsights(data) {
    const { jobTitle, location, recruiterType } = data;
    
    const userPrompt = `Provide market insights for this role:

**Job Title:** ${jobTitle}
**Location:** ${location}

Include:

**1. Typical Salary Range**
– Junior: $XX,XXX - $XX,XXX AUD
– Mid-level: $XX,XXX - $XX,XXX AUD
– Senior: $XX,XXX - $XX,XXX AUD

**2. Market Demand**
☐ Very High ☐ High ☐ Moderate ☐ Low

**3. Key Skills Employers Seek**
– Skill 1
– Skill 2
– Skill 3

**4. Talent Pool Availability**
[Current market conditions]

**5. Hiring Trends**
– Trend 1
– Trend 2

**6. Time-to-Fill Estimate**
[Typical timeframe]

Base insights on Australian market data where possible.`;

    return await this.chat([
      { role: 'user', content: userPrompt }
    ], { recruiterType });
  }

  async createPipelineTracker(jobTitle, recruiterType) {
    const userPrompt = `Create a recruitment pipeline tracker template for: **${jobTitle}**

Provide:

**1. Pipeline Stages**

| Stage | Typical Timeframe | Key Actions |
|-------|------------------|-------------|
| Sourcing | 1-2 weeks | ... |
| Screening | 3-5 days | ... |
| Interview | 1-2 weeks | ... |
| Offer | 3-5 days | ... |

**2. Key Metrics to Track**
– Metric 1
– Metric 2
– Metric 3

**3. Red Flags to Watch For**
– Flag 1
– Flag 2

**4. Tips for Moving Candidates Through Efficiently**
1. Tip 1
2. Tip 2
3. Tip 3

Format as a practical, implementable guide with tables.`;

    return await this.chat([
      { role: 'user', content: userPrompt }
    ], { recruiterType });
  }

  async analyzeCareerPath(data) {
    const { employeeName, currentRole, employeeProfile, careerGoals, recruiterType } = data;
    
    const userPrompt = `Analyse career mobility opportunities for this employee:

**Employee:** ${employeeName}
**Current Role:** ${currentRole}
**Skills & Experience:**
${employeeProfile}
${careerGoals ? `**Career Goals:** ${careerGoals}` : ''}

Provide a comprehensive SkillPath analysis:

**1. Current Skill Assessment**
– Key strengths and skills
– Current skill level ratings

**2. Suggested Internal Career Paths** (3-4 realistic next roles)

For each role:
– **Role Title:**
– **Why They're a Good Fit:**
– **Probability of Success:** ☐ Low ☐ Medium ☐ High
– **Timeline to Transition:** [timeframe]

**3. Skill Gap Analysis**

For each suggested role:
– **Missing Skills (must-have):**
– **Skills to Strengthen (nice-to-have):**
– **Experience Gaps:**

**4. 90-Day Development Plan**

**Month 1: Immediate Actions**
– Action 1
– Action 2

**Month 2: Skill Building**
– Activity 1
– Activity 2

**Month 3: Practice & Application**
– Application 1
– Application 2

**5. Retention Strategy**
– Why this career path keeps them engaged
– Key motivators for career conversations
– Red flags if they don't see growth

Format with clear headers, bullet points, and realistic timeframes. Focus on INTERNAL mobility within the same organisation.`;

    return await this.chat([
      { role: 'user', content: userPrompt }
    ], { recruiterType });
  }
}

module.exports = new CollabHireService();
