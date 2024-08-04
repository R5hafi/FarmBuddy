import argparse
import pandas as pd
import numpy as np
import joblib

# Load the model and scaler
model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')

# Define feature names
feature_names = ['N', 'P', 'K', 'temperature', 'humidity', 'pH', 'rainfall']

# Function to predict the best plant based on given conditions
def predict_best_plant(conditions):
    conditions_df = pd.DataFrame([conditions], columns=feature_names)
    conditions_scaled = scaler.transform(conditions_df)
    predicted_plant = model.predict(conditions_scaled)
    return predicted_plant[0]

# Function to evaluate how well a given plant will do under certain conditions
def evaluate_plant(conditions, plant):
    conditions_df = pd.DataFrame([conditions], columns=feature_names)
    conditions_scaled = scaler.transform(conditions_df)
    plant_proba = model.predict_proba(conditions_scaled)
    plant_index = model.classes_.tolist().index(plant)
    return plant_proba[0][plant_index]

# Function to calculate the similarity score of all plants and sort them by value
def similarity_score(conditions):
    df = pd.read_csv('Crop_recommendation.csv')
    conditions_df = pd.DataFrame([conditions], columns=feature_names)
    conditions_scaled = scaler.transform(conditions_df)
    
    distances = {}
    for plant in model.classes_:
        plant_data = df[df['plant'] == plant][feature_names]
        plant_mean = plant_data.mean()
        plant_mean_scaled = scaler.transform([plant_mean])
        distance = np.linalg.norm(conditions_scaled - plant_mean_scaled)
        distances[plant] = distance

    # Convert distances to a score between 0 and 1
    max_distance = max(distances.values())
    for plant in distances:
        distances[plant] = 1 - (distances[plant] / max_distance)
    
    # Sort distances by value
    sorted_distances = sorted(distances.items(), key=lambda item: item[1], reverse=True)
    
    return sorted_distances

def main():
    parser = argparse.ArgumentParser(description='Plant prediction and evaluation based on soil conditions.')
    
    parser.add_argument('--N', type=float, required=True, help='Nitrogen content')
    parser.add_argument('--P', type=float, required=True, help='Phosphorus content')
    parser.add_argument('--K', type=float, required=True, help='Potassium content')
    parser.add_argument('--temperature', type=float, required=True, help='Temperature')
    parser.add_argument('--humidity', type=float, required=True, help='Humidity')
    parser.add_argument('--pH', type=float, required=True, help='pH value')
    parser.add_argument('--rainfall', type=float, required=True, help='Rainfall')

    parser.add_argument('action', choices=['predict', 'evaluate', 'similarity'], help='Action to perform')

    parser.add_argument('--plant', type=str, help='Plant name for evaluation')

    args = parser.parse_args()
    
    conditions = {
        'N': args.N,
        'P': args.P,
        'K': args.K,
        'temperature': args.temperature,
        'humidity': args.humidity,
        'pH': args.pH,
        'rainfall': args.rainfall
    }
    
    if args.action == 'predict':
        predicted_plant = predict_best_plant(conditions)
        print(f'The best plant for the given conditions is: {predicted_plant}')
    
    elif args.action == 'evaluate':
        if not args.plant:
            raise ValueError('Plant name is required for evaluation.')
        probability = evaluate_plant(conditions, args.plant)
        print(f'The probability that {args.plant} will do well under the given conditions is: {probability * 100:.2f}%')
    
    elif args.action == 'similarity':
        similarity_scores = similarity_score(conditions)
        for plant, score in similarity_scores:
            print(f'The similarity score for {plant} is: {score * 100:.2f}%')

if __name__ == '__main__':
    main()