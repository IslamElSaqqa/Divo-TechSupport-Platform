# Release Notes

## TechSupport Platform

### Release Summary

This release introduces the unified TechSupport Platform repository, combining the frontend React application and backend Node.js/Express API into a single project root while preserving the frontend commit history.

### Highlights

- Unified full-stack project structure with clear separation of `frontend/` and `backend/`.
- React-based interface for customer support, community engagement, service requests, and technician workflows.
- Express API supporting authentication, community posts, help sessions, specialist management, web scraping, Windows error tracking, and file uploads.
- Secure handling of environment-specific data by excluding sensitive files and directories from source control.

### Included Improvements

- Added professional project documentation in `README.md`
- Configured root `.gitignore` to exclude backend secrets, certificates, uploads, and dependencies
- Committed consolidated project structure and pushed to the remote repository

### Notes

The repository intentionally excludes:
- `backend/certs/`
- `backend/config/`
- `backend/node_modules/`
- `backend/uploads/`
- `backend/.env`
- `backend/cloudinaryInfo.txt`
