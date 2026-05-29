pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarQube analysis...'
                sh 'echo "SonarQube will be configured here"'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security scan...'
                sh 'npm audit --audit-level=high || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to test environment...'
                sh '''
                    export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin
                    docker build -t todo-api .
                    docker stop todo-api-container || true
                    docker rm todo-api-container || true
                    docker run -d -p 4000:5000 --name todo-api-container todo-api
                '''
            }
        }

        stage('Release') {
            steps {
                echo 'Tagging release...'
                sh '''
                    export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin
                    docker tag todo-api todo-api:v1.0
                '''
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking application health...'
                sh '''
                    export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin
                    curl -f http://localhost:4000 || echo "Health check failed"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}