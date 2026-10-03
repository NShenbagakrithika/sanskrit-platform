pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        PATH = "/Users/shenbagakrithika/.nvm/versions/node/v24.12.0/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        IMAGE_NAME = 'sanskrit-platform'
        CI = 'true'
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --format="%H %s"'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm run install:ci
                    npm run build
                '''
            }
        }

        stage('Test/Validate') {
            steps {
                sh '''
                    npm run typecheck
                    npm test
                    python3 tests/storage.test.py
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker info > /dev/null
                    docker build \
                      --label org.opencontainers.image.revision="$(git rev-parse HEAD)" \
                      -t "$IMAGE_NAME:$BUILD_NUMBER" .
                    docker image inspect "$IMAGE_NAME:$BUILD_NUMBER" \
                      --format 'Image created: {{.Id}}'
                '''
            }
        }

        stage('Result') {
            steps {
                echo "Build ${env.BUILD_NUMBER} passed. Image: ${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully.'
        }
        failure {
            echo 'CI pipeline failed. Check the failed stage and Console Output.'
        }
    }
}
