const API = "http://127.0.0.1:8000";

let latestReport = null;
async function analyzePage() {
    const button = document.querySelector("button");
    button.disabled = true;
    button.innerText = "Analyzing...";

    const url = document.getElementById("urlInput").value.trim();

    const loading = document.getElementById("loading");
    const results = document.getElementById("results");

    results.innerHTML = "";
    loading.classList.remove("hidden");

    if (!url) {
        loading.classList.add("hidden");

        results.innerHTML = `
        <div class="card">
            <h3>⚠️ URL Required</h3>
            <p>Please enter a website URL.</p>
        </div>
        `
        document
        .getElementById("downloadBtn")
        .classList.add("hidden");
        button.disabled = false;
        button.innerText = "Analyze";
        return;
    }

    try {

        const response = await fetch(
            `${API}/audit?url=${encodeURIComponent(url)}`
        );

        const data = await response.json();
        latestReport = data;

        loading.classList.add("hidden");

        if (!response.ok) {

            results.innerHTML = `
            <div class="card">
                <h3>❌ Something went wrong</h3>

                <p>
                    ${data.detail}
                    <br><br>
                    Try entering a valid URL like
                    <strong>https://example.com</strong>
                </p>
            </div>
            `;
            button.disabled = false;
            button.innerText = "Analyze";
            return;
        }

        /* -------------------------
           SEO SCORE
        -------------------------- */

        let seoScore = 0;

        if (data.title !== "Not Found") seoScore += 25;

        if (data.meta_description !== "Not Found")
            seoScore += 25;

        if (data.h1_count > 0)
            seoScore += 25;

        if (data.images_missing_alt === 0)
            seoScore += 25;


        /* -------------------------
           STATUS COLOR
        -------------------------- */

        let statusColor = "#16a34a";
        let statusText = "Success";

        if (data.status_code >= 400) {
            statusColor = "#dc2626";
            statusText = "Error";
        }

        else if (data.status_code >= 300) {
            statusColor = "#f59e0b";
            statusText = "Redirect";
        }


        /* -------------------------
           RESPONSE TIME
        -------------------------- */

        let speed = "";
        let speedColor = "";

        if (data.response_time_ms < 500) {

            speed = "Excellent";
            speedColor = "#16a34a";

        }

        else if (data.response_time_ms < 1500) {

            speed = "Moderate";
            speedColor = "#f59e0b";

        }

        else {

            speed = "Slow";
            speedColor = "#dc2626";

        }


        /* -------------------------
           DISPLAY RESULTS
        -------------------------- */

        results.innerHTML = `

        <div style="grid-column:1/-1">

            <h2 style="margin-bottom:10px;">
                ✅ Analysis Complete
            </h2>

            <p style="text-align:left;">
                <strong>Website:</strong>
                ${data.url}
            </p>

        </div>


        <div class="card">

            <h3>🏆 SEO Score</h3>

            <p style="
                font-size:32px;
                font-weight:bold;
                color:#2563eb;
            ">
                ${seoScore}/100
            </p>

        </div>


        <div class="card">

            <h3>🟢 HTTP Status</h3>

            <p style="
                color:${statusColor};
                font-weight:bold;
                font-size:22px;
            ">
                ${data.status_code}
                (${statusText})
            </p>

        </div>


        <div class="card">

            <h3>⚡ Response Time</h3>

            <p>

                ${Math.round(data.response_time_ms)} ms

                <br>

                <span
                    style="
                    color:${speedColor};
                    font-weight:bold;
                    "
                >
                    ${speed}
                </span>

            </p>

        </div>


        <div class="card">

            <h3>📄 Page Title</h3>

            <p>${data.title}</p>

        </div>


        <div class="card">

            <h3>📝 Meta Description</h3>

            <p>${data.meta_description}</p>

        </div>


        <div class="card">

            <h3>🏷️ H1 Tags</h3>

            <p>${data.h1_count}</p>

        </div>


        <div class="card">

            <h3>🖼️ Images Missing Alt</h3>

            <p>${data.images_missing_alt} image(s)</p>

        </div>


        <div class="card">

            <h3>📚 Word Count</h3>

            <p>${data.word_count} words</p>

        </div>


        <div class="card">

            <h3>⏱️ Reading Time</h3>

            <p>${data.reading_time_minutes} minute(s)</p>

        </div>

        `
        document
        .getElementById("downloadBtn")
        .classList.remove("hidden");
        button.disabled = false;
        button.innerText = "Analyze";
    }

    catch (error) {

        loading.classList.add("hidden");

        results.innerHTML = `

        <div class="card">

            <h3>❌ Unable to Connect</h3>

            <p>

                Could not reach the backend server.

                <br><br>

                Please ensure your FastAPI server is running at

                <strong>http://127.0.0.1:8000</strong>

            </p>

        </div>
        
        `
        document
        .getElementById("downloadBtn")
        .classList.add("hidden");
        button.disabled = false;
        button.innerText = "Analyze";
    }
}
function downloadReport(){

    if(!latestReport) return;

    const report = {

        website: latestReport.url,

        status: latestReport.status_code,

        response_time_ms: latestReport.response_time_ms,

        title: latestReport.title,

        meta_description: latestReport.meta_description,

        h1_count: latestReport.h1_count,

        images_missing_alt: latestReport.images_missing_alt,

        word_count: latestReport.word_count,

        reading_time_minutes: latestReport.reading_time_minutes,

        generated_at: new Date().toLocaleString()

    };

    const blob = new Blob(

        [
            JSON.stringify(
                report,
                null,
                4
            )
        ],

        {
            type:"application/json"
        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "pagepulse-report.json";

    a.click();

    URL.revokeObjectURL(url);

}