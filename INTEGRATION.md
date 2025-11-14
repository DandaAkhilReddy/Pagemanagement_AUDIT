# Integration Guide - Billing Audit Documentation

## Table of Contents
1. [CodeRabbit.ai Integration](#coderabbitai-integration)
2. [MCP Filesystem Integration](#mcp-filesystem-integration)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Testing Framework](#testing-framework)
5. [Deployment Options](#deployment-options)

---

## CodeRabbit.ai Integration

### Overview
CodeRabbit.ai provides automated code review and quality analysis for the documentation.

### Configuration Files
- `.coderabbit.yaml` - Main configuration
- `.coderabbit/config.json` - API settings

### API Key Setup
The CodeRabbit API key is: `cr-37f5226fae640e4bd3ecd3d73e140934b08eac0455c7de1076e93b25d1`

### Features Enabled
- ✅ Automated code review on pull requests
- ✅ HTML/CSS/JS quality checks
- ✅ Accessibility validation (WCAG 2.0 AA)
- ✅ Performance monitoring
- ✅ Security scanning
- ✅ PHI/PII data protection checks

### Usage

#### Manual Review
```bash
# Install CodeRabbit CLI (if available)
npm install -g @coderabbitai/cli

# Run review on current branch
coderabbit review --api-key=cr-37f5226fae640e4bd3ecd3d73e140934b08eac0455c7de1076e93b25d1
```

#### Automated Review (GitHub Actions)
Reviews automatically run on:
- Pull requests
- Pushes to main/master branch

### API Testing with CodeRabbit

```javascript
// Example: Test documentation validation API
const CodeRabbitClient = require('@coderabbitai/client');

const client = new CodeRabbitClient({
    apiKey: 'cr-37f5226fae640e4bd3ecd3d73e140934b08eac0455c7de1076e93b25d1'
});

async function validateDocumentation() {
    const result = await client.review({
        files: ['index.html', 'pages/*.html'],
        checks: ['accessibility', 'performance', 'security']
    });

    console.log('Review Results:', result);
}
```

### Custom Health Checks
The configuration includes custom checks for:
1. **PHI/PII Protection** - Scans for protected health information
2. **Financial Data Security** - Validates anonymization
3. **Documentation Completeness** - Ensures proper structure

---

## MCP Filesystem Integration

### Overview
Model Context Protocol (MCP) filesystem server enables advanced file operations and version control integration.

### Configuration
File: `.claude/mcp-settings.json`

### Features
- ✅ Real-time file watching
- ✅ Automatic backup (every 30 minutes)
- ✅ Git integration
- ✅ File change notifications
- ✅ Version history

### Setup

```bash
# Install MCP server
npx -y @modelcontextprotocol/server-filesystem

# Start MCP server (auto-starts with Claude)
# Configuration is in .claude/mcp-settings.json
```

### File Operations via MCP

```javascript
// The MCP server automatically handles:
// - File reads/writes
// - Directory listings
// - File search
// - Git operations
// - Backup management
```

### Backup Configuration
- Interval: 30 minutes
- Max backups: 10
- Location: `.backups/` directory

---

## CI/CD Pipeline

### GitHub Actions Workflow
File: `.github/workflows/ci-cd.yml`

### Pipeline Stages

#### 1. Code Quality Check
```yaml
- Lint HTML files
- Lint CSS files
- Lint JavaScript files
```

#### 2. CodeRabbit AI Review
```yaml
- Automated code review
- Security analysis
- Best practices validation
```

#### 3. Testing & Validation
```yaml
- Run test suite
- Check broken links
- Validate data integrity
```

#### 4. Accessibility Testing
```yaml
- WCAG 2.0 compliance
- Screen reader compatibility
- Keyboard navigation
```

#### 5. Security Scan
```yaml
- Trivy vulnerability scanner
- Dependency audit
- SARIF reporting
```

#### 6. Deploy to GitHub Pages
```yaml
- Build static site
- Deploy to gh-pages branch
- Update live site
```

### Setting Up Secrets

```bash
# Add to GitHub repository secrets:
CODERABBIT_API_KEY=cr-37f5226fae640e4bd3ecd3d73e140934b08eac0455c7de1076e93b25d1
GITHUB_TOKEN=<auto-provided>
```

### Manual Deployment

```bash
# Deploy to GitHub Pages
npm run deploy:gh-pages

# Or use GitHub CLI
gh workflow run ci-cd.yml
```

---

## Testing Framework

### Test Suite Overview
File: `tests/validation.test.js`

### Test Categories

#### 1. HTML Structure Validation
- Meta tags presence
- Semantic HTML usage
- Heading hierarchy
- Required elements

#### 2. Link Validation
- Internal links working
- No broken links
- Proper href attributes

#### 3. Accessibility Checks
- Alt text on images
- ARIA labels
- Form labels
- Heading structure

#### 4. Data Integrity
- Currency format validation
- Percentage validation
- Date format consistency

#### 5. Responsiveness
- Viewport configuration
- Media queries
- Mobile compatibility

#### 6. Performance
- Page load times
- Page size optimization
- Resource loading

### Running Tests

```bash
# Run all tests
npm test

# Run specific test category
node tests/validation.test.js

# Run in browser console
window.runDocumentationTests()
```

### Test Results
Tests output:
- ✅ Passed tests
- ⚠️ Warnings (non-critical)
- ❌ Failed tests (need fixing)

---

## Deployment Options

### Option 1: GitHub Pages (Recommended)

```bash
# Setup
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select 'gh-pages' branch or use GitHub Actions

# Automated deployment
- Pushes to main/master automatically deploy
- URL: https://username.github.io/billing-audit-docs/
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Link to project
vercel link
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.

# Or drag-and-drop to Netlify web UI
```

### Option 4: AWS S3 + CloudFront

```bash
# Install AWS CLI
aws configure

# Sync to S3
aws s3 sync . s3://your-bucket-name --exclude ".git/*" --exclude "node_modules/*"

# Setup CloudFront distribution for HTTPS
```

### Option 5: Self-Hosted Server

```bash
# Using Nginx
server {
    listen 80;
    server_name billing-audit-docs.example.com;
    root /var/www/billing-audit-docs;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

# Restart Nginx
sudo systemctl restart nginx
```

---

## Advanced Configuration

### Custom Domain Setup

#### GitHub Pages
1. Add CNAME file with your domain
2. Configure DNS:
   ```
   Type: CNAME
   Name: billing-audit-docs
   Value: username.github.io
   ```

#### SSL Certificate
- GitHub Pages: Auto-provided
- Vercel/Netlify: Auto-provided
- Self-hosted: Use Let's Encrypt

### Environment Variables

Create `.env` file:
```bash
CODERABBIT_API_KEY=cr-37f5226fae640e4bd3ecd3d73e140934b08eac0455c7de1076e93b25d1
NODE_ENV=production
ANALYTICS_ID=UA-XXXXXXXXX-X
```

### Analytics Integration

Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X');
</script>
```

---

## Monitoring & Maintenance

### Health Checks

```bash
# Check CodeRabbit API status
curl https://api.coderabbit.ai/v1/health

# Check website uptime
curl -I https://your-domain.com

# Run automated tests
npm test
```

### Scheduled Maintenance

1. **Weekly**: Review CodeRabbit findings
2. **Monthly**: Update dependencies
3. **Quarterly**: Full accessibility audit
4. **Annually**: Security audit

### Support

For issues:
1. Check GitHub Issues
2. Review CodeRabbit dashboard
3. Check CI/CD pipeline logs
4. Contact: support@pagemanagementassociates.com

---

## Troubleshooting

### Common Issues

**Issue**: CodeRabbit not running
```bash
# Solution: Verify API key in GitHub secrets
# Re-run workflow manually
```

**Issue**: Deployment fails
```bash
# Solution: Check GitHub Actions logs
# Verify branch protection rules
# Ensure all tests pass
```

**Issue**: MCP server not starting
```bash
# Solution: Check Node.js version (>= 14)
# Verify configuration in .claude/mcp-settings.json
# Check file permissions
```

---

## License & Compliance

- **License**: PROPRIETARY
- **HIPAA Compliance**: Built-in PHI/PII checks
- **SOC 2**: Security scanning enabled
- **Accessibility**: WCAG 2.0 AA compliant

---

Last Updated: 2024-11-14
Version: 1.0.0
