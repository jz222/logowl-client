cd ..
rm -rf build
rm -rf dist
npm run build
mkdir dist
cp -R build/. dist/
cp scripts/config.js build/
firebase deploy
rm -rf build