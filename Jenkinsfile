pipeline {
  agent { label 'agent-1' }

  stages {
      stage('Install') {
        steps { sh 'npm install' }
      }
      stage('Build') {
        steps { sh 'npm run-script build' }
      }
  }
}
