pipeline {
    agent any
    
    tools {
        nodejs "node"
        
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/JatinderSDhiman/HRSystem.git'
            }
        }
        
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh 'npm run test'
            }
        }
        stage('Create tar file') {
            steps {
                sh 'tar -cvzf HRsystem-API.tar.gz .'
            }
        }
        stage('Archive artifact') {
            steps {
                archiveArtifacts artifacts: 'HRsystem-API.tar.gz', onlyIfSuccessful: true
            }
        }
    
    }
}
