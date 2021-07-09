pipeline {
    agent any

  stages {
      stage('Install') {
        steps { sh 'npm install' }
      }
      stage('Build') {
          steps {
              sh 'npm run-script build'
          }
      }
      stage('Test') {
          steps {
              echo 'Testing..'
          }
      }
      stage('Deploy') {
          steps {
              echo 'Deploying....'
          }
      }
  }
}
