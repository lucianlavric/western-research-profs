#!/usr/bin/env python3
"""
Analyze duplicate publications in professors.json
Writes results to a JSON file for reliable output capture
"""
import json
from collections import defaultdict
from pathlib import Path

# Load data
data_file = Path(__file__).parent / "data" / "professors.json"
with open(data_file, 'r') as f:
    data = json.load(f)

# Analyze duplicates
results = {
    "total_professors": 0,
    "professors_with_duplicates": 0,
    "professors": []
}

for prof in data.get("professors", []):
    prof_id = prof.get("id", "unknown")
    name = prof.get("name", "unknown")
    publications = prof.get("publications", [])
    
    # Count publication titles
    title_counts = defaultdict(int)
    for pub in publications:
        title = pub.get("title", "")
        if title:
            title_counts[title] += 1
    
    # Find duplicates
    duplicates = {title: count for title, count in title_counts.items() if count > 1}
    
    if duplicates:
        results["professors_with_duplicates"] += 1
        results["professors"].append({
            "id": prof_id,
            "name": name,
            "department": prof.get("department", ""),
            "num_duplicate_titles": len(duplicates),
            "total_duplicate_instances": sum(duplicates.values()),
            "duplicate_titles": [
                {"title": title, "count": count} 
                for title, count in sorted(duplicates.items(), key=lambda x: -x[1])
            ]
        })
    
    results["total_professors"] += 1

# Sort by total duplicates
results["professors"].sort(key=lambda x: -x["total_duplicate_instances"])

# Write to file
output_file = Path(__file__).parent / "duplicate_analysis_results.json"
with open(output_file, 'w') as f:
    json.dump(results, f, indent=2)

print(f"Analysis complete! Results written to {output_file}")
print(f"Total professors: {results['total_professors']}")
print(f"Professors with duplicates: {results['professors_with_duplicates']}")
