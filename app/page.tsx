"use client";

import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";

const standards = [
  { name: "GOTS", type: "Organic textile", score: 92, coverage: "Fiber → finished product", color: "green" },
  { name: "OEKO-TEX® STANDARD 100", type: "Chemical safety", score: 76, coverage: "Finished product", color: "blue" },
  { name: "Fair Trade Certified", type: "Labor & livelihoods", score: 84, coverage: "Cut & sew facility", color: "rose" },
];

const stages = [
  { city: "Rajkot, India", label: "Cotton farm", status: "Verified", tone: "good" },
  { city: "Coimbatore, India", label: "Spinning mill", status: "Verified", tone: "good" },
  { city: "Tiruppur, India", label: "Dyeing facility", status: "Partial", tone: "warn" },
  { city: "Dhaka, Bangladesh", label: "Cut & sew", status: "Unverified", tone: "bad" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"certification" | "manufacturer">("certification");
  const [fileName, setFileName] = useState("");
  const [notice, setNotice] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    setNotice(`Background check started for “${query.trim()}”. Sample evidence is shown below.`);
    setTimeout(() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setNotice(`${file.name} is ready for document checks. This prototype uses sample findings.`);
    }
  };

  const dropFile = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      setNotice(`${file.name} is ready for document checks. This prototype uses sample findings.`);
    }
  };

  const ask = (event: FormEvent) => {
    event.preventDefault();
    if (!question.trim()) return;
    setAnswer("The strongest next step is to request a current cut-and-sew facility audit, worker grievance data, and a transaction certificate linking the finished goods to the certified cotton. Those three items close the largest evidence gaps in this review.");
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Looma home">
          <span className="brandMark">L</span><span>Looma</span>
        </a>
        <nav aria-label="Primary navigation">
          <a className="active" href="#investigate">Investigate</a>
          <a href="#compare">Compare</a>
          <a href="#report">Reports</a>
        </nav>
        <div className="headerActions">
          <button className="iconButton" aria-label="Notifications">♢</button>
          <button className="avatar" aria-label="Account menu">AM</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span>✦</span> SUPPLY CHAIN INTELLIGENCE</div>
        <h1>Know what’s behind<br />every <em>thread.</em></h1>
        <p className="heroCopy">Evidence-led background checks for textile certifications and manufacturers—translated into decisions you can trust.</p>

        <div className="searchPanel" id="investigate">
          <div className="tabs" role="tablist" aria-label="Investigation type">
            <button className={activeTab === "certification" ? "selected" : ""} onClick={() => setActiveTab("certification")} role="tab">Certification</button>
            <button className={activeTab === "manufacturer" ? "selected" : ""} onClick={() => setActiveTab("manufacturer")} role="tab">Manufacturer</button>
          </div>
          <form className="searchRow" onSubmit={runSearch}>
            <span className="searchIcon">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label={`Search ${activeTab}`} placeholder={activeTab === "certification" ? "Search GOTS, SA8000, OEKO-TEX..." : "Search a supplier or manufacturer..."} />
            <button type="submit">Run background check <span>→</span></button>
          </form>
          <div className="or"><span />OR UPLOAD EVIDENCE<span /></div>
          <div className="dropzone" onDrop={dropFile} onDragOver={(e) => e.preventDefault()} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}>
            <div className="uploadIcon">⇧</div>
            <div><strong>{fileName || "Drop certification PDFs here"}</strong><small>{fileName ? "Select another PDF" : "or click to browse · PDF up to 20MB"}</small></div>
            <input ref={inputRef} type="file" accept="application/pdf" hidden onChange={selectFile} />
          </div>
          {notice && <div className="notice" role="status">✓ {notice}</div>}
        </div>
        <div className="trustRow"><span>Evidence, not marketing</span><span>•</span><span>Sources cited</span><span>•</span><span>Gaps made visible</span></div>
      </section>

      <section className="reportSection" id="report">
        <div className="sectionHeading">
          <div><span className="kicker">SAMPLE INVESTIGATION</span><h2>Aranya Textiles Ltd.</h2><p>Integrated knitwear manufacturer · Tiruppur, India</p></div>
          <div className="reportMeta"><span className="liveDot" /> Evidence refreshed 18 Jul 2026 <button onClick={() => setNotice("Report link copied to your workspace.")}>Share report</button></div>
        </div>

        <div className="summaryGrid">
          <article className="scoreCard">
            <div className="scoreRing"><div><strong>72</strong><span>/100</span></div></div>
            <div><span className="label">OVERALL CONFIDENCE</span><h3>Promising, with gaps</h3><p>Environmental claims are well supported. Labor evidence needs stronger, more current documentation.</p></div>
          </article>
          <article className="metricCard green"><span className="metricIcon">♧</span><div><span className="label">ENVIRONMENT</span><strong>Strong</strong><small>8 of 10 claims supported</small></div></article>
          <article className="metricCard peach"><span className="metricIcon">♙</span><div><span className="label">LABOR</span><strong>Needs review</strong><small>4 of 8 claims supported</small></div></article>
          <article className="metricCard cream"><span className="metricIcon">◎</span><div><span className="label">TRACEABILITY</span><strong>Partial</strong><small>3 of 4 tiers mapped</small></div></article>
        </div>

        <div className="contentGrid">
          <article className="panel chainPanel">
            <div className="panelHead"><div><span className="kicker">SUPPLY CHAIN</span><h3>From farm to factory</h3></div><button className="textButton">View evidence ↗</button></div>
            <div className="chain">
              {stages.map((stage, i) => <div className="stage" key={stage.label}>
                <div className={`stageDot ${stage.tone}`}>{i + 1}</div>
                <div><strong>{stage.label}</strong><small>{stage.city}</small><span className={`status ${stage.tone}`}>{stage.status}</span></div>
              </div>)}
            </div>
            <div className="gapCallout"><span>!</span><div><strong>One critical link is missing</strong><p>The cut-and-sew facility is named in a supplier declaration, but no recent independent audit or certificate was provided.</p></div><button onClick={() => setQuestion("What should I ask this supplier for?")}>What to request →</button></div>
          </article>

          <article className="panel evidencePanel">
            <div className="panelHead"><div><span className="kicker">EVIDENCE HEALTH</span><h3>What we could verify</h3></div><span className="pill">14 sources</span></div>
            <div className="barRow"><div><span>Certifications</span><strong>90%</strong></div><div className="bar"><i style={{ width: "90%" }} /></div></div>
            <div className="barRow"><div><span>Environmental data</span><strong>78%</strong></div><div className="bar"><i style={{ width: "78%" }} /></div></div>
            <div className="barRow warn"><div><span>Labor practices</span><strong>52%</strong></div><div className="bar"><i style={{ width: "52%" }} /></div></div>
            <div className="barRow bad"><div><span>Subcontractors</span><strong>25%</strong></div><div className="bar"><i style={{ width: "25%" }} /></div></div>
            <div className="sourceList"><div><span className="sourceIcon">D</span><p><strong>GOTS scope certificate</strong><small>Valid through May 2027 · Primary</small></p><span className="check">✓</span></div><div><span className="sourceIcon">W</span><p><strong>Open Supply Hub record</strong><small>Updated Jan 2026 · Third party</small></p><span className="check">✓</span></div><div><span className="sourceIcon faded">R</span><p><strong>2024 impact report</strong><small>Company published · Self-reported</small></p><span className="caution">!</span></div></div>
          </article>
        </div>
      </section>

      <section className="compareSection" id="compare">
        <div className="sectionHeading"><div><span className="kicker">COMPARE STANDARDS</span><h2>See beyond the badge.</h2><p>Different certifications answer different questions. Compare what they cover—and what they don’t.</p></div><button className="secondaryButton" onClick={() => setNotice("Comparison builder opened with these three standards.")}>Customize comparison</button></div>
        <div className="comparisonTable">
          <div className="compareLabels"><div className="empty" /><span>Primary focus</span><span>Chain coverage</span><span>Worker protection</span><span>Chemical controls</span><span>Independent audits</span><span>Plain-language verdict</span></div>
          {standards.map((item) => <article className="standardCard" key={item.name}>
            <div className={`standardTop ${item.color}`}><span className="certSeal">{item.name.charAt(0)}</span><div><h3>{item.name}</h3><small>{item.type}</small></div><strong>{item.score}</strong></div>
            <div><p>{item.type}</p></div><div><p>{item.coverage}</p></div>
            <div><span className={item.name.includes("OEKO") ? "partialMark" : "yesMark"}>{item.name.includes("OEKO") ? "◐ Partial" : "✓ Strong"}</span></div>
            <div><span className={item.name.includes("Fair") ? "partialMark" : "yesMark"}>{item.name.includes("Fair") ? "◐ Limited" : "✓ Strong"}</span></div>
            <div><span className="yesMark">✓ Required</span></div>
            <div className="verdict"><p>{item.name === "GOTS" ? "Best all-round signal for organic fiber and responsible processing." : item.name.includes("OEKO") ? "Strong product safety check; not a full sustainability or labor standard." : "Strongest of these for worker benefits; limited upstream traceability."}</p><button onClick={() => setQuestion(`What is missing from ${item.name}?`)}>Full background check →</button></div>
          </article>)}
        </div>
      </section>

      <section className="askSection">
        <div className="askIntro"><span className="spark">✦</span><div><span className="kicker">ASK LOOMA</span><h2>Turn evidence into your next question.</h2><p>Ask about this manufacturer, compare standards, or find the exact documents to request.</p></div></div>
        <form onSubmit={ask} className="askBox"><input value={question} onChange={(e) => setQuestion(e.target.value)} aria-label="Ask a follow-up question" placeholder="e.g. What should I ask this supplier for before placing an order?"/><button type="submit">Ask <span>↑</span></button></form>
        <div className="suggestions"><button onClick={() => setQuestion("Compare GOTS and OEKO-TEX")}>Compare GOTS and OEKO-TEX</button><button onClick={() => setQuestion("Show me the biggest risk")}>Show me the biggest risk</button><button onClick={() => setQuestion("Draft a supplier follow-up")}>Draft a supplier follow-up</button></div>
        {answer && <div className="answer"><span>✦</span><p>{answer}</p></div>}
      </section>

      <footer><a className="brand" href="#top"><span className="brandMark">L</span><span>Looma</span></a><p>Clarity for every thread in your supply chain.</p><div><a href="#report">Methodology</a><a href="#compare">Standards library</a><a href="#top">Privacy</a></div></footer>
    </main>
  );
}
