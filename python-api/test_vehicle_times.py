#!/usr/bin/env python3
"""
Test script for vehicle-specific time estimation
Demonstrates the new Google Maps-like time estimation feature
"""

import requests
import json

# API base URL
BASE_URL = "http://localhost:5000"

def test_vehicle_types():
    """Test getting available vehicle types"""
    print("=== Testing Vehicle Types Endpoint ===")
    
    response = requests.get(f"{BASE_URL}/vehicle-types")
    
    if response.status_code == 200:
        data = response.json()
        print("✅ Vehicle types retrieved successfully")
        print(json.dumps(data, indent=2))
    else:
        print(f"❌ Failed to get vehicle types: {response.status_code}")
        print(response.text)

def test_route_with_vehicles(access_token):
    """Test route planning with different vehicle types"""
    print("\n=== Testing Route Planning with Vehicle Types ===")
    
    # Sample coordinates (Maubin area)
    route_data = {
        "start_lon": 95.6530,
        "start_lat": 16.7300,
        "end_lon": 95.6550,
        "end_lat": 16.7320,
        "start_name": "Maubin Market",
        "end_name": "Maubin Bridge"
    }
    
    headers = {"Authorization": f"Bearer {access_token}"}
    
    # Test each vehicle type
    for vehicle_type in ['car', 'motorcycle', 'bicycle', 'walking']:
        print(f"\n--- Testing {vehicle_type.upper()} ---")
        
        route_data['vehicle_type'] = vehicle_type
        
        response = requests.post(
            f"{BASE_URL}/routes", 
            json=route_data, 
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get('is_success'):
                route_info = data['data']
                print(f"✅ Route calculated for {vehicle_type}")
                print(f"   Distance: {route_info['distance']:.1f}m")
                print(f"   Time ({vehicle_type}): {route_info['estimated_time']:.1f}s ({route_info['estimated_time']/60:.1f} min)")
                
                # Show all vehicle times for comparison
                if 'estimated_times' in route_info:
                    print("   All vehicle times:")
                    for v_type, time_s in route_info['estimated_times'].items():
                        print(f"     {v_type}: {time_s:.1f}s ({time_s/60:.1f} min)")
            else:
                print(f"❌ Route calculation failed: {data.get('msg')}")
        else:
            print(f"❌ Request failed: {response.status_code}")
            print(response.text)

def login_user():
    """Login to get access token"""
    print("=== Logging in ===")
    
    login_data = {
        "email": "test@example.com",  # Replace with actual test user
        "password": "password123"     # Replace with actual password
    }
    
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    
    if response.status_code == 200:
        data = response.json()
        if data.get('is_success'):
            print("✅ Login successful")
            return data['access_token']
        else:
            print(f"❌ Login failed: {data.get('msg')}")
    else:
        print(f"❌ Login request failed: {response.status_code}")
        print(response.text)
    
    return None

def main():
    """Main test function"""
    print("🚗 Vehicle Time Estimation Test")
    print("=" * 40)
    
    # Test vehicle types endpoint (no auth required)
    test_vehicle_types()
    
    # Test route planning with authentication
    access_token = login_user()
    if access_token:
        test_route_with_vehicles(access_token)
    else:
        print("\n⚠️  Skipping route tests - login failed")
        print("Please create a test user or update login credentials")

if __name__ == "__main__":
    main()