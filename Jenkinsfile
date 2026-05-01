pipeline{
    agent any
    tools {
        nodejs 'NodeJS'
    }

    stages{
        stage("build frontend"){
            steps {
                sh "npm run build"
            }
        }
        stage("e2e test") {
            steps {
                sh "npm test"
            }
        }
    }
}