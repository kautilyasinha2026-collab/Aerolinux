document.addEventListener("DOMContentLoaded", () => {
    
    const GITHUB_USERNAME = "your-username";
    const GITHUB_REPO = "aero-linux";

    const githubLinkEl = document.getElementById("github-link");
    if(githubLinkEl && GITHUB_USERNAME !== "your-username") {
        githubLinkEl.href = `https://github.com{GITHUB_USERNAME}/${GITHUB_REPO}`;
    }

    async function fetchGitHubStats() {
        if(GITHUB_USERNAME === "your-username") return;
        
        try {
            const response = await fetch(`https://github.com{GITHUB_USERNAME}/${GITHUB_REPO}`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById("repo-stars").textContent = data.stargazers_count;
                document.getElementById("repo-issues").textContent = data.open_issues_count;
            }
        } catch (error) {
            console.error("Failed to load metrics from the GitHub Live Engine API.", error);
        }
    }
    fetchGitHubStats();

    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            const targetId = tab.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });
});
