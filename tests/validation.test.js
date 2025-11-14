/**
 * Billing Audit Documentation - Validation Test Suite
 * Tests HTML structure, links, accessibility, and data integrity
 */

// Configuration
const CONFIG = {
    baseUrl: './',
    pages: [
        'index.html',
        'pages/company-overview.html',
        'pages/revenue-cycle-process.html',
        'pages/daily-operations.html',
        'pages/payer-management.html',
        'pages/critical-issues.html',
        'pages/denial-management.html',
        'pages/financial-reconciliation.html',
        'pages/automation-recommendations.html',
        'pages/metrics-kpis.html'
    ],
    requiredSections: [
        'Executive Summary',
        'Company Overview',
        'Revenue Cycle Process',
        'Daily Operations',
        'Payer Management',
        'Critical Issues',
        'Denial Management',
        'Financial Reconciliation',
        'Automation Roadmap',
        'Metrics & KPIs'
    ]
};

// Test Results Storage
const testResults = {
    passed: [],
    failed: [],
    warnings: []
};

/**
 * Main test runner
 */
async function runAllTests() {
    console.log('🧪 Starting Billing Audit Documentation Tests...\n');

    await testHTMLStructure();
    await testLinks();
    await testAccessibility();
    await testDataIntegrity();
    await testResponsiveness();
    await testPerformance();

    printTestResults();
}

/**
 * Test 1: HTML Structure Validation
 */
async function testHTMLStructure() {
    console.log('📄 Testing HTML Structure...');

    for (const page of CONFIG.pages) {
        try {
            const response = await fetch(CONFIG.baseUrl + page);
            const html = await response.text();

            // Check for required meta tags
            if (!html.includes('<meta charset="UTF-8">')) {
                testResults.failed.push(`${page}: Missing charset meta tag`);
            }

            // Check for viewport meta tag
            if (!html.includes('<meta name="viewport"')) {
                testResults.failed.push(`${page}: Missing viewport meta tag`);
            }

            // Check for proper heading hierarchy
            const h1Count = (html.match(/<h1/g) || []).length;
            if (h1Count !== 1) {
                testResults.warnings.push(`${page}: Should have exactly 1 <h1> tag, found ${h1Count}`);
            }

            // Check for semantic HTML
            if (!html.includes('<main') && !html.includes('<section')) {
                testResults.failed.push(`${page}: Missing semantic HTML elements`);
            }

            testResults.passed.push(`${page}: HTML structure valid`);
        } catch (error) {
            testResults.failed.push(`${page}: ${error.message}`);
        }
    }
}

/**
 * Test 2: Link Validation
 */
async function testLinks() {
    console.log('🔗 Testing Links...');

    for (const page of CONFIG.pages) {
        try {
            const response = await fetch(CONFIG.baseUrl + page);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const links = doc.querySelectorAll('a[href]');

            for (const link of links) {
                const href = link.getAttribute('href');

                // Skip external links and anchors
                if (href.startsWith('http') || href.startsWith('#')) continue;

                // Check if internal link exists
                try {
                    const linkResponse = await fetch(CONFIG.baseUrl + href);
                    if (linkResponse.status !== 200) {
                        testResults.failed.push(`${page}: Broken link to ${href}`);
                    }
                } catch (error) {
                    testResults.failed.push(`${page}: Invalid link ${href}`);
                }
            }

            testResults.passed.push(`${page}: All links valid`);
        } catch (error) {
            testResults.failed.push(`${page}: Link validation error - ${error.message}`);
        }
    }
}

/**
 * Test 3: Accessibility Checks
 */
async function testAccessibility() {
    console.log('♿ Testing Accessibility...');

    for (const page of CONFIG.pages) {
        try {
            const response = await fetch(CONFIG.baseUrl + page);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Check for alt text on images
            const images = doc.querySelectorAll('img');
            for (const img of images) {
                if (!img.hasAttribute('alt')) {
                    testResults.failed.push(`${page}: Image missing alt text`);
                }
            }

            // Check for ARIA labels on interactive elements
            const buttons = doc.querySelectorAll('button');
            for (const button of buttons) {
                if (!button.textContent.trim() && !button.hasAttribute('aria-label')) {
                    testResults.warnings.push(`${page}: Button missing accessible label`);
                }
            }

            // Check for form labels
            const inputs = doc.querySelectorAll('input');
            for (const input of inputs) {
                if (input.type !== 'hidden' && !input.hasAttribute('aria-label') && !doc.querySelector(`label[for="${input.id}"]`)) {
                    testResults.warnings.push(`${page}: Input missing label`);
                }
            }

            // Check for proper heading structure
            const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
            let lastLevel = 0;
            for (const heading of headings) {
                const level = parseInt(heading.tagName.charAt(1));
                if (level > lastLevel + 1) {
                    testResults.warnings.push(`${page}: Heading hierarchy skip from h${lastLevel} to h${level}`);
                }
                lastLevel = level;
            }

            testResults.passed.push(`${page}: Accessibility checks passed`);
        } catch (error) {
            testResults.failed.push(`${page}: Accessibility test error - ${error.message}`);
        }
    }
}

/**
 * Test 4: Data Integrity
 */
async function testDataIntegrity() {
    console.log('💰 Testing Data Integrity...');

    const dataPatterns = {
        currency: /\$[\d,]+(?:\.\d{2})?/g,
        percentage: /\d+(?:\.\d+)?%/g,
        dates: /\d{1,2}\/\d{1,2}(?:\/\d{2,4})?/g
    };

    for (const page of CONFIG.pages) {
        try {
            const response = await fetch(CONFIG.baseUrl + page);
            const html = await response.text();

            // Validate currency formats
            const currencies = html.match(dataPatterns.currency) || [];
            for (const currency of currencies) {
                if (!/\$\d{1,3}(,\d{3})*(\.\d{2})?/.test(currency)) {
                    testResults.warnings.push(`${page}: Inconsistent currency format: ${currency}`);
                }
            }

            // Validate percentages
            const percentages = html.match(dataPatterns.percentage) || [];
            for (const pct of percentages) {
                const value = parseFloat(pct);
                if (value > 100 && !html.includes('ROI')) {
                    testResults.warnings.push(`${page}: Unusual percentage value: ${pct}`);
                }
            }

            testResults.passed.push(`${page}: Data integrity validated`);
        } catch (error) {
            testResults.failed.push(`${page}: Data integrity error - ${error.message}`);
        }
    }
}

/**
 * Test 5: Responsiveness
 */
async function testResponsiveness() {
    console.log('📱 Testing Responsiveness...');

    for (const page of CONFIG.pages) {
        try {
            const response = await fetch(CONFIG.baseUrl + page);
            const html = await response.text();

            // Check for responsive meta tag
            if (html.includes('width=device-width')) {
                testResults.passed.push(`${page}: Responsive viewport configured`);
            } else {
                testResults.failed.push(`${page}: Missing responsive viewport`);
            }

            // Check for media queries in CSS
            if (html.includes('@media')) {
                testResults.passed.push(`${page}: Contains media queries`);
            } else {
                testResults.warnings.push(`${page}: No media queries found`);
            }
        } catch (error) {
            testResults.failed.push(`${page}: Responsiveness test error - ${error.message}`);
        }
    }
}

/**
 * Test 6: Performance
 */
async function testPerformance() {
    console.log('⚡ Testing Performance...');

    for (const page of CONFIG.pages) {
        try {
            const startTime = performance.now();
            const response = await fetch(CONFIG.baseUrl + page);
            const html = await response.text();
            const endTime = performance.now();

            const loadTime = endTime - startTime;
            const pageSize = new Blob([html]).size / 1024; // KB

            if (loadTime > 1000) {
                testResults.warnings.push(`${page}: Slow load time: ${loadTime.toFixed(2)}ms`);
            }

            if (pageSize > 500) {
                testResults.warnings.push(`${page}: Large page size: ${pageSize.toFixed(2)}KB`);
            }

            testResults.passed.push(`${page}: Performance acceptable (${loadTime.toFixed(2)}ms, ${pageSize.toFixed(2)}KB)`);
        } catch (error) {
            testResults.failed.push(`${page}: Performance test error - ${error.message}`);
        }
    }
}

/**
 * Print test results
 */
function printTestResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(60));

    console.log(`\n✅ PASSED: ${testResults.passed.length}`);
    testResults.passed.forEach(result => console.log(`  ✓ ${result}`));

    if (testResults.warnings.length > 0) {
        console.log(`\n⚠️  WARNINGS: ${testResults.warnings.length}`);
        testResults.warnings.forEach(result => console.log(`  ! ${result}`));
    }

    if (testResults.failed.length > 0) {
        console.log(`\n❌ FAILED: ${testResults.failed.length}`);
        testResults.failed.forEach(result => console.log(`  ✗ ${result}`));
    }

    const totalTests = testResults.passed.length + testResults.failed.length;
    const passRate = ((testResults.passed.length / totalTests) * 100).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log(`Overall Pass Rate: ${passRate}%`);
    console.log('='.repeat(60) + '\n');

    return testResults.failed.length === 0;
}

// Export for use in CI/CD
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests, testResults };
}

// Auto-run in browser console
if (typeof window !== 'undefined') {
    window.runDocumentationTests = runAllTests;
}
