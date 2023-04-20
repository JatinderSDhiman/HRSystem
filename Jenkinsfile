pipeline {
    agent any
    
    tools {nodejs "node"}

    stages {
        stage('Check out') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'main', url: 'https://github.com/JatinderSDhiman/HRSystem.git'
            }

        }
        stage('Install Dependencies') {
            
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {

            steps {
                sh 'npm test'
            }
        }
        stage('Start server') {
\
            steps {
                sh 'npm start'
            }
        }

    }
}
