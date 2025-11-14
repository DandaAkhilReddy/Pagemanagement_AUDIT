# Quick Reference Card

## 🚀 Essential Commands

### Start Development Server
```bash
npm start              # Python server on port 8000
npm run serve          # Live server on port 8080
```

### Testing
```bash
npm test                          # Run all tests
node tests/validation.test.js     # Run validation tests
node scripts/test-coderabbit-api.js  # Test CodeRabbit API
```

### Code Quality
```bash
npm run lint           # Run all linters
npm run lint:html      # Lint HTML files
npm run lint:css       # Lint CSS files
npm run lint:js        # Lint JavaScript files
npm run validate       # Lint + Test
```

### Deployment
```bash
npm run build                # Build for production
npm run deploy:gh-pages      # Deploy to GitHub Pages
git push origin main         # Auto-deploy via GitHub Actions
```

---

## 🔑 CodeRabbit API Key
```
cr-37f5226fae640e4bd3ecd3d73e140934b08eac0455c7de1076e93b25d1
```

**Usage:**
- Add to GitHub Secrets as `CODERABBIT_API_KEY`
- Used in `.coderabbit.yaml` and `.coderabbit/config.json`

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `index.html` | Main entry point |
| `css/styles.css` | Enhanced styles with animations |
| `js/interactive.js` | Interactive features |
| `.coderabbit.yaml` | CodeRabbit configuration |
| `.github/workflows/ci-cd.yml` | CI/CD pipeline |
| `tests/validation.test.js` | Test suite |
| `package.json` | Dependencies & scripts |

---

## ✨ Interactive Features

| Feature | How to Use |
|---------|------------|
| **Search** | Type in search bar at top of page |
| **Collapse Sections** | Click on section headings (h2) |
| **Dark Mode** | Click moon/sun icon in sidebar |
| **Filter Tables** | Use filter inputs in table headers |
| **Print** | Click print button in page header |
| **Back to Top** | Click arrow button (appears when scrolling) |

---

## 🌐 URLs

### Local Development
- Direct: `file:///path/to/index.html`
- Python: `http://localhost:8000`
- Live Server: `http://localhost:8080`

### Production
- GitHub Pages: `https://USERNAME.github.io/billing-audit-docs/`
- Custom Domain: Configure in repository settings

---

## 📊 File Structure

```
billing-audit-docs/
├── index.html                    # Main page
├── pages/                        # 9 content pages
├── css/styles.css                # Enhanced styles
├── js/interactive.js             # Interactive features
├── tests/validation.test.js      # Test suite
├── scripts/test-coderabbit-api.js # API testing
├── .github/workflows/ci-cd.yml   # CI/CD
├── .coderabbit.yaml              # CodeRabbit config
├── .claude/mcp-settings.json     # MCP config
└── Documentation (4 MD files)
```

---

## 🧪 Test Checklist

Before deploying:
- [ ] `npm test` passes
- [ ] `npm run lint` passes
- [ ] All pages load correctly
- [ ] Search works
- [ ] Dark mode works
- [ ] Tables filterable
- [ ] Links valid
- [ ] Mobile responsive

---

## 🔧 Troubleshooting

### Interactive features not working
```bash
# Check if JS is included in HTML
grep "interactive.js" index.html
grep "interactive.js" pages/*.html
```

### CodeRabbit not running
```bash
# Check GitHub Secrets
# Settings > Secrets > CODERABBIT_API_KEY

# Re-run workflow
gh workflow run ci-cd.yml
```

### Deployment fails
```bash
# Check Actions logs
gh run list
gh run view <run-id>

# Verify tests pass locally
npm run validate
```

---

## 📖 Documentation Guide

| Document | When to Read |
|----------|--------------|
| `README.md` | Overview and quick start |
| `SETUP_GUIDE.md` | First-time setup |
| `INTEGRATION.md` | CodeRabbit/MCP integration |
| `IMPLEMENTATION_SUMMARY.md` | What was built |
| `QUICK_REFERENCE.md` | This file - daily use |

---

## 🎯 Common Tasks

### Add a New Page
1. Create `pages/new-page.html`
2. Copy structure from existing page
3. Add to navigation in all files
4. Update `tests/validation.test.js`
5. Test and deploy

### Update Styles
1. Edit `css/styles.css`
2. Test in browser
3. Run `npm run lint:css`
4. Commit and push

### Add JavaScript Feature
1. Edit `js/interactive.js`
2. Test in browser console
3. Run `npm run lint:js`
4. Commit and push

---

## 🚨 Emergency Contacts

- **GitHub Issues**: Repository Issues tab
- **Email**: support@pagemanagementassociates.com
- **Documentation**: See `INTEGRATION.md`

---

## 📊 Success Indicators

✅ All tests passing
✅ CodeRabbit review complete
✅ GitHub Actions green
✅ Site accessible online
✅ All features working
✅ Mobile responsive
✅ Dark mode functional

---

## 🎓 Learning Resources

- CodeRabbit Dashboard: https://coderabbit.ai
- GitHub Actions: https://docs.github.com/actions
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- MCP Protocol: https://github.com/modelcontextprotocol

---

**Version:** 1.0.0
**Last Updated:** 2024-11-14
**Status:** Production Ready ✅
