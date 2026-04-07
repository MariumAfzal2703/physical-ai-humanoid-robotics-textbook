# Testing Full Functionality

After deploying both the backend to Railway and the frontend to Netlify, follow these steps to test the complete system:

## Pre-deployment Checklist

Before testing, ensure:
- [ ] Backend is deployed to Railway and accessible
- [ ] Frontend environment variables are updated with the deployed backend URL
- [ ] Frontend is deployed to Netlify
- [ ] All required services (Qdrant, Neon DB, Groq API, GitHub OAuth) are properly configured

## Testing Steps

### 1. Health Check
- Visit the backend health endpoint: `GET /health`
- Should return: `{ "status": "ok" }`

### 2. Frontend Basic Functionality
- [ ] Visit the deployed frontend URL
- [ ] Verify the animated galaxy background is working
- [ ] Check that the navbar, hero section, and all components render properly
- [ ] Test dark/light mode toggle
- [ ] Verify responsive design on different screen sizes
- [ ] Check that custom cursors and progress bar work

### 3. Chatbot Functionality
- [ ] Open the floating chatbot
- [ ] Test sending a message
- [ ] Verify the message is sent to the backend
- [ ] Check that you receive a response from the AI
- [ ] Verify source citations are displayed
- [ ] Test multiple conversation turns

### 4. Authentication Features
- [ ] Test the login/signup functionality
- [ ] Verify GitHub OAuth works
- [ ] Check that authentication state is maintained
- [ ] Test the logout functionality

### 5. Personalization Features
- [ ] Navigate to a chapter
- [ ] Use the personalization feature (if authenticated)
- [ ] Verify the chapter content adapts to your background
- [ ] Check that the focus options work

### 6. Translation Features
- [ ] Navigate to a chapter
- [ ] Use the Urdu translation feature
- [ ] Verify the content is translated properly
- [ ] Check that the translated content displays correctly

### 7. Error Handling
- [ ] Test with invalid inputs
- [ ] Check error messages are displayed appropriately
- [ ] Verify graceful degradation when services are unavailable

## Expected Outcomes

- [ ] All frontend animations and components work smoothly
- [ ] Backend API calls complete successfully
- [ ] Chatbot responds with relevant answers from the textbook content
- [ ] User authentication works seamlessly
- [ ] Personalization adapts content based on user profile
- [ ] Translation provides accurate Urdu versions of chapters
- [ ] All features work in both light and dark mode
- [ ] Mobile responsiveness is maintained across all features

## Troubleshooting

If issues occur:

1. **Chatbot not responding**: Check that `VITE_BACKEND_URL` is correctly set in the frontend environment
2. **Authentication issues**: Verify all OAuth settings are correctly configured in the backend
3. **Personalization/Translation not working**: Confirm the RAG system is properly indexing content in Qdrant
4. **Performance issues**: Check that all external services (Qdrant, DB, AI APIs) are responding promptly

## Verification Commands

You can test the backend API directly:

```bash
# Test health check
curl https://your-railway-app.up.railway.app/health

# Test chat endpoint (if you have a session ID)
curl -X POST https://your-railway-app.up.railway.app/chat \
  -H "Content-Type": "application/json" \
  -d '{"question": "What is Physical AI?", "session_id": "test-session"}'
```