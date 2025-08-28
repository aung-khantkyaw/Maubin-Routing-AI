-- Update road types and add vehicle_type to routes table

-- Update roads table constraints
ALTER TABLE roads DROP CONSTRAINT IF EXISTS roads_road_type_check;
ALTER TABLE roads ADD CONSTRAINT roads_road_type_check 
CHECK (road_type IN (
    'highway', 'main_road', 'local_road', 'residential', 'service', 'pedestrian'
));

-- Update existing road types
UPDATE roads SET road_type = 'main_road' WHERE road_type = 'local';
UPDATE roads SET road_type = 'local_road' WHERE road_type = 'service';

-- Add vehicle_type column to routes table
ALTER TABLE routes ADD COLUMN IF NOT EXISTS vehicle_type VARCHAR(20) DEFAULT 'car';
ALTER TABLE routes ADD CONSTRAINT routes_vehicle_type_check 
CHECK (vehicle_type IN ('car', 'motorcycle', 'bicycle', 'walking'));

-- Add estimated_times JSONB column for all vehicle times
ALTER TABLE routes ADD COLUMN IF NOT EXISTS estimated_times JSONB;

-- Comments
COMMENT ON COLUMN roads.road_type IS 'Road classification for speed calculation';
COMMENT ON COLUMN routes.vehicle_type IS 'Vehicle type used for time calculation';
COMMENT ON COLUMN routes.estimated_times IS 'Time estimates for all vehicle types in seconds';