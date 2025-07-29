module.exports = {
  apps: [
    {
      name: 'dentaflow-api',
      script: 'server/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      // Logs
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Monitoring
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      
      // Memory and CPU limits
      max_memory_restart: '1G',
      
      // Watch mode (development)
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'uploads'],
      
      // Environment variables
      env_file: '.env',
      
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Health check
      health_check_grace_period: 3000,
      
      // Error handling
      autorestart: true,
      exp_backoff_restart_delay: 100,
      
      // Performance
      node_args: '--max-old-space-size=1024',
      
      // Security
      uid: 'dentaflow',
      gid: 'dentaflow',
      
      // Cron jobs
      cron_restart: '0 2 * * *', // Restart at 2 AM daily
      
      // Metrics
      merge_logs: true,
      time: true
    }
  ],
  
  deploy: {
    production: {
      user: 'dentaflow',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/dentaflow.git',
      path: '/var/www/dentaflow',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}; 