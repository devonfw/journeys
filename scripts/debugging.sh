echo "Start Debugging Script"
ls -l
ls dist -l
ls dist/devon4ng-mat-layout/ -l
echo "cp ohne . "
cp -avr /dist/devon4ng-mat-layout/ target/generated-docs/website/pages/journeys/

ls target/generated-docs/website/pages/journeys/
echo "cp mit *"
cp -avr /dist/devon4ng-mat-layout/* target/generated-docs/website/pages/journeys/
ls target/generated-docs/website/pages/journeys/

echo "cp ohne . Punkt mit ../.."
cp -avr /dist/devon4ng-mat-layout/ ../../target/generated-docs/website/pages/journeys/
ls ../../target/generated-docs/website/pages/journeys/
echo "cp mit * Punkt mit ../.."
cp -avr /dist/devon4ng-mat-layout/* ../../target/generated-docs/website/pages/journeys/

echo "End Debugging Script"