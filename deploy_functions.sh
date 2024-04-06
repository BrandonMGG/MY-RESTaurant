cd functions
gcloud functions deploy food-recommendation \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-south1 \
  --source=. \
  --entry-point=food-recommendation \
  --trigger-http \
  --allow-unauthenticated