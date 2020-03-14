#!/bin/sh -xe

# Set env variables required for this script.
# eg.
# export GOPATH=${WORKSPACE}
# export PATH=$GOPATH/bin:$PATH
# export JENKINS_HOST="10.162.0.3"
# export BACKEND_PATH=${WORKSPACE}/src/bitbucket.org/dealtap/backend/
# export FRONTEND_PATH=${WORKSPACE}/src/bitbucket.org/dealtap/frontend/

# Core variables
export CORE_MY_PORT=16000
export CORE_POSTGRES_USER="dealtap"
export CORE_POSTGRES_PASSWORD="dealtapv4"
export CORE_POSTGRES_HOST=${JENKINS_HOST}
export CORE_POSTGRES_PORT=5432
export CORE_POSTGRES_DBNAME="dealtapv4"
export CORE_POSTGRES_SSLMODE="disable"
export CORE_MY_ERRORSEXTMODE="DEV"
export CORE_MY_OREAENDPOINT="http://${JENKINS_HOST}:16000/graphql"
export CORE_FRONTEND_REDIRECTRESPONSESUCCESS="Response=Yes"
export CORE_FRONTEND_REDIRECTRESPONSEFAIL="Response=No"
export CORE_OREA_RESPONSESUCCESS="Yes"
export CORE_OREA_RESPONSEFAIL="No"
export CORE_GCP_PROJECTID="dealtap-219117"
export CORE_GCP_STORE_CREDENTIALFILEPATH="./resources/dealtap-219117-e6d607e2b6ec.json"
export CORE_GCP_STORE_BUCKET="dealtapv4-pdf"
export CORE_GCP_STORE_STORAGECLASS="REGIONAL"
export CORE_GCP_STORE_STORAGELOCATION="northamerica-northeast1"
export CORE_GCP_STORE_BUCKETACL="authenticatedRead"
export CORE_GCP_STORE_OBJECTACL="authenticatedRead"
export CORE_GCP_PUBSUB_CREDENTIALFILEPATH="./resources/dealtapv4-pubsub.json"
export CORE_GCP_PUBSUB_EMAIL_TOPICID="notification-email"
export CORE_TOKENEXPIRATION_EMAIL=86400
export CORE_TOKENEXPIRATION_USER=86400
export CORE_EMAILTEMPLATE_AGENTACCOUNTACTIVATION="4-0-agent-account-activation"
export CORE_EMAILTEMPLATE_PASSWORDRESET="4-0-password-reset"
export CORE_EMAILTEMPLATE_AGENTINVITATIONTOSIGNUPTOBO="4-0-agent-s-invitation-to-sign-up"
export CORE_EMAILTEMPLATE_AGENTINVITATIONTOJOINBO="4-0-agent-s-invitation-to-join-brokerage-office"
export CORE_EMAILTEMPLATE_ADMININVITATIONTOSIGNUPTOBO="4-0-admin-s-invitation-to-sign-up"
export CORE_EMAILTEMPLATE_ADMINBOACCESSGRANTED="4-0-admin-s-notification-of-access-granted"
export CORE_EMAILTEMPLATE_AGENTREMOVEDFROMBO="4-0-agent-s-notification-of-removal"
export CORE_EMAILTEMPLATE_ADMINREMOVEDFROMBO="4-0-admin-s-notification-of-access-removal"
export CORE_EMAILTEMPLATE_AGENTREJECTIONOFBO="4-0-agent-s-rejection-of-brokerage-invitation"
export CORE_EMAILTEMPLATE_CPUSERCPACCESSGRANTED="4-0-notification-of-cp-user-identity-added"
export CORE_EMAILTEMPLATE_CPUSERINVITATIONTOSIGNUP="4-0-cp-user-s-invitation-to-sign-up"
export CORE_EMAILTEMPLATE_CPUSERACCESSREMOVED="4-0-cp-user-suspended"
export CORE_EMAILURL_LOGIN="https://app-40qa1.dealtap.ca/login"
export CORE_EMAILURL_ACTIVATEACCOUNT="https://app-40qa1.dealtap.ca/user-activation?token=%s"
export CORE_EMAILURL_PASSWORDRESET="https://app-40qa1.dealtap.ca/reset-password?token=%s"
export CORE_EMAILURL_REJECTINVITE="https://app-40qa1.dealtap.ca/reject?inviteId=%s"
export CORE_EMAILURL_ACCEPTINVITE="https://app-40qa1.dealtap.ca/accept?inviteId=%s"
export CORE_EMAILURL_MANAGEAGENTS="https://app-40qa1.dealtap.ca/agent-management/"
export CORE_EMAILSUBJECT_AGENTINVITATIONTOSIGNUPTOBO="[DealTap] Sign Up as an agent of %s"
export CORE_EMAILSUBJECT_AGENTINVITATIONTOJOINBO="[DealTap] You have been invited to join %s"
export CORE_EMAILSUBJECT_ADMININVITATIONTOSIGNUPTOBO="[DealTap] Invitation - Sign Up as %s of %s"
export CORE_EMAILSUBJECT_ADMINBOACCESSGRANTED="[DealTap] You have been granted %s role to %s"
export CORE_EMAILSUBJECT_AGENTREMOVEDFROMBO="[DealTap] You have been removed from %s"
export CORE_EMAILSUBJECT_ADMINREMOVEDFROMBO="[DealTap] Your admin access has been removed from %s"
export CORE_EMAILSUBJECT_AGENTREJECTIONOFBO="[DealTap] Invitation to join brokerage rejected by %s"
export CORE_LOADER_WAITTIME="2ms"
export CORE_LOADER_MAXBATCH=100

# Core location variables, used in the frontend
export HTTP_ENDPOINT="http://${JENKINS_HOST}:16000/graphql"
export OREA_VALIDATION_ENDPOINT="http://${JENKINS_HOST}:16000/orea"
export UPLOAD_ENDPOINT="http://${JENKINS_HOST}:16000/upload"

# Test suite variables
export FRONTEND_BASE_URL=http://${JENKINS_HOST}:10000
export TEST_USER_PASSWORD=password
export TEST_USER_EMAIL=test@dealtap.ca
export BROWSERS='chromium --no-sandbox'

# Cleanup function to be run to make sure all docker containers are
# shut down and removed on each test run.
cleanup () {
  echo "Cleaning Up..."
  cd ${FRONTEND_PATH}
  make e2e-tests-down || true
  make docker-down || true
  cd ${BACKEND_PATH}
  make db-clean || true
  make docker-down s=core || true
  echo "Done Cleanup..."
}

# Frontend has been updated in this pipeline.
# Get backend compatible version.
cd ${FRONTEND_PATH}
BACKEND_VERSION=$(make be-version)
echo ${BACKEND_VERSION}

# Defer cleanup on EXIT signal
echo "Cleanup will trigger on exit"
trap cleanup EXIT

# Run cleanup. Clean up containers if any still exist (if deferred cleanup on last run somehow did not complete)
echo "Initial Cleanup"
cleanup

# Launch db, backend, & frontend and launch tests
# Run tests
cd ${FRONTEND_PATH}
make e2e-tests

# Run tail command to hang Jenkins and delay cleanup, for debugging purposes.
# tail -f /dev/null
