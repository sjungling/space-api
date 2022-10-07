#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[   "$VERCEL_GIT_COMMIT_REF" =~ "test/" || 
        "$VERCEL_GIT_COMMIT_REF" =~ "actions/" || 
        "$VERCEL_GIT_COMMIT_REF" =~ "renovate/" || 
        "$VERCEL_GIT_COMMIT_MESSAGE" =~ "docs:" 
    ]] ; then
    # Don't build
    echo "🛑 - Build Canceled"
    exit 0;
else
    # Proceed with the build
    echo "✅ - Build can proceed"
    exit 1;
fi
