import json

with open('data/professors.json', 'r') as f:
    data = json.load(f)

duplicates = {}

for professor in data['professors']:
    prof_id = professor['id']
    prof_name = professor['name']
    publications = professor.get('publications', [])
    
    title_counts = {}
    for pub in publications:
        title = pub.get('title', '').strip()
        if title:
            title_counts[title] = title_counts.get(title, 0) + 1
    
    prof_duplicates = {title: count for title, count in title_counts.items() if count > 1}
    
    if prof_duplicates:
        duplicates[prof_id] = {
            'name': prof_name,
            'num_duplicate_publications': len(prof_duplicates),
            'duplicate_titles': list(prof_duplicates.keys()),
            'total_duplicates': sum(prof_duplicates.values()) - len(prof_duplicates)
        }

sorted_duplicates = sorted(duplicates.items(), key=lambda x: x[1]['total_duplicates'], reverse=True)

print("=" * 80)
print("DUPLICATE PUBLICATIONS ANALYSIS")
print("=" * 80)
print()
print(f"Total professors with duplicate publications: {len(sorted_duplicates)}")
print()

for prof_id, info in sorted_duplicates:
    print(f"Professor ID: {prof_id}")
    print(f"Name: {info['name']}")
    print(f"Number of duplicate titles: {info['num_duplicate_publications']}")
    print(f"Total duplicate instances: {info['total_duplicates']}")
    print("Duplicate titles:")
    for title in info['duplicate_titles']:
        print(f"  • {title}")
    print("-" * 80)
    print()
