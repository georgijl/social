### ℹ️ Development Insights

This project uses Github integration on a custom dockerized runner.  
Any version control changes should be made only via [Merge Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request), excluding hotfix scenarios.

# 🔍 Setup (Linux only)

1. Clone the repository into a workdir(e.g /var/www/projects/cez-group/).
2. Install docker-compose
3. Navigate to /server directory and install node modules (`npm install` via node 16+ version).
4. Navigate to /social directory and install node modules (`npm install` via node 16+ version).
5. In /server directory run `docker-compose up`. That will start your docker container.
6. In /server directory run `npm start` to build the backend.
7. In /social directory run `npm start` to build the frontend.

### 💡 Tips

- Database root `http://localhost:5555/`
- Frontend root `http://localhost:3000/`
