import pandas as pd
import numpy as np
import joblib

# Load the model and scaler
model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')

# Function to predict the best plant based on given conditions
def predict_best_plant(conditions):
    conditions_df = pd.DataFrame([conditions], columns=['N', 'P', 'K', 'temperature', 'humidity', 'pH', 'rainfall'])
    conditions_scaled = scaler.transform(conditions_df)
    predicted_plant = model.predict(conditions_scaled)
    return predicted_plant[0]

# Function to evaluate how well a given plant will do under certain conditions
def evaluate_plant(conditions, plant):
    conditions_df = pd.DataFrame([conditions], columns=['N', 'P', 'K', 'temperature', 'humidity', 'pH', 'rainfall'])
    conditions_scaled = scaler.transform(conditions_df)
    plant_proba = model.predict_proba(conditions_scaled)
    plant_index = model.classes_.tolist().index(plant)
    return plant_proba[0][plant_index]

# Function to calculate the similarity score of all plants
def similarity_score(conditions):
    df = pd.read_csv('Crop_recommendation.csv')
    conditions_df = pd.DataFrame([conditions], columns=['N', 'P', 'K', 'temperature', 'humidity', 'pH', 'rainfall'])
    conditions_scaled = scaler.transform(conditions_df)
    
    distances = {}
    for plant in model.classes_:
        plant_data = df[df['plant'] == plant][['N', 'P', 'K', 'temperature', 'humidity', 'pH', 'rainfall']]
        plant_mean = plant_data.mean()
        plant_mean_scaled = scaler.transform([plant_mean])
        distance = np.linalg.norm(conditions_scaled - plant_mean_scaled)
        distances[plant] = distance

    # Convert distances to a score between 0 and 1
    max_distance = max(distances.values())
    for plant in distances:
        distances[plant] = 1 - (distances[plant] / max_distance)
    
    return distances

# Example usage:
conditions = {'N': 85, 'P': 58, 'K': 41, 'temperature': 21.77, 'humidity': 80.32, 'pH': 7.03, 'rainfall': 226.66}
predicted_plant = predict_best_plant(conditions)
print(f'The best plant for the given conditions is: {predicted_plant}')

# Evaluate multiple plants
plants = ['rice', 'orange', 'pomegranate', 'maize']
for plant in plants:
    probability = evaluate_plant(conditions, plant)
    print(f'The probability that {plant} will do well under the given conditions is: {probability * 100:.2f}%')

# Calculate similarity scores
similarity_scores = similarity_score(conditions)
for plant, score in similarity_scores.items():
    print(f'The similarity score for {plant} is: {score * 100:.2f}%')
