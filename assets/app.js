(function () {
  const root = document.documentElement;

  // Theme
  const savedTheme = localStorage.getItem("tc_theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("tc_theme", next);
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Docs search + Cmd/Ctrl+K focus
  const docSearch = document.getElementById("docSearch");
  const docsGrid = document.getElementById("docsGrid");
  if (docSearch && docsGrid) {
    const cards = Array.from(docsGrid.querySelectorAll("[data-tags]"));

    const filter = () => {
      const q = docSearch.value.trim().toLowerCase();
      cards.forEach((c) => {
        const tags = (c.getAttribute("data-tags") || "").toLowerCase();
        const title = (c.querySelector("h3")?.textContent || "").toLowerCase();
        const show = !q || tags.includes(q) || title.includes(q);
        c.style.display = show ? "block" : "none";
      });
    };

    docSearch.addEventListener("input", filter);

    window.addEventListener("keydown", (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        docSearch.focus();
      }
    });
  }

  // Contact email generator
  const contactForm = document.getElementById("contactForm");
  const emailOutput = document.getElementById("emailOutput");
  const copyBtn = document.getElementById("copyEmailBtn");

  if (contactForm && emailOutput) {
    let lastEmail = "";

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const recipient = (document.getElementById("recipient")?.value || "").trim();
      const fromEmail = (document.getElementById("fromEmail")?.value || "").trim();
      const focus = (document.getElementById("focus")?.value || "sandbox").trim();
      const notes = (document.getElementById("notes")?.value || "").trim();

      const subjectMap = {
        sandbox: "TransitCloud — Sandbox / Innovation Review Request",
        pilot: "TransitCloud — Pilot Request (Verifiable Financial Documents)",
        enterprise: "TransitCloud — Enterprise Verification & Audit Infrastructure",
      };

      const subject = subjectMap[focus] || subjectMap.sandbox;

      const header = [
        recipient ? `To: ${recipient}` : "To: [Recipient / Division]",
        fromEmail ? `From: ${fromEmail}` : "From: Kam Swygert",
        `Subject: ${subject}`,
        "",
      ].join("\n");

      const body = [
        "Hello,",
        "",
        "My name is Kam Swygert. I built TransitCloud, a cryptographically verifiable document system that converts invoices, receipts, and audit records into tamper-evident instruments.",
        "",
        "TransitCloud provides:",
        "• deterministic canonicalization (stable bytes)",
        "• SHA-256 root hashes for integrity",
        "• Ed25519 signatures for authenticity",
        "• portable proof bundles for offline verification",
        "• optional onchain anchoring of roots for timestamped attestation",
        "",
        focus === "sandbox"
          ? "I’m requesting a regulatory sandbox / innovation review to pilot TransitCloud with a limited set of South Carolina participants under strict controls (limited doc types, full logging, clear disclosures, no speculative trading)."
          : focus === "pilot"
          ? "I’m requesting a pilot with your organization to demonstrate fraud-resistant document verification and audit trail integrity using real invoices/receipts under controlled conditions."
          : "I’m reaching out to discuss enterprise deployment for document verification, audit, and custody rails, with optional public attestation via onchain root anchoring.",
        "",
        notes ? `Notes:\n${notes}\n` : "",
        "I can provide a one-page overview, technical documentation, and a working demo on request.",
        "",
        "Sincerely,",
        "Kam Swygert",
        "TransitCloud Document Currency Infrastructure",
      ].join("\n");

      lastEmail = `${header}${body}`;
      emailOutput.textContent = lastEmail;
      if (copyBtn) copyBtn.disabled = false;
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(lastEmail);
          copyBtn.textContent = "Copied";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
        } catch {
          // fallback: select output text
          const range = document.createRange();
          range.selectNodeContents(emailOutput);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
    }
  }
})();
