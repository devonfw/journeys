BASEDIR=$(dirname "$0")
cd $BASEDIR/../
for d in $(find journeys -name 'target'); do 
    rsync -av $d'/generated-docs/' './target/generated-docs/'$(echo $d | sed s#/target#/#)
    rm -r $d
done

ls -l 
#for d in $(find target -name '.flattened-pom.xml'); do 
#    rm $d
#done
#
rm ../target/generated-docs/journeys/journey-pom-template.xml
rm -r ../target/generated-docs/scripts

ls journeys/ -l
ls ../target/generated-docs/ -l
ls ../target/generated-docs/journeys -l
node scripts/htmlToJson.js ../target/generated-docs/journeys ../target/generated-docs/journeys/journeyData