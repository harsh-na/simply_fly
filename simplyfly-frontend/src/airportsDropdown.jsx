const airportsDropdown =
  // [    // India
  //   { label: 'Delhi - Indira Gandhi International Airport - (DEL)', year: 1962 },
  //   { label: 'Mumbai - Chhatrapati Shivaji Maharaj International Airport - (BOM)', year: 1942 },
  //   { label: 'Bangalore - Kempegowda International Airport - (BLR)', year: 2008 },
  //   { label: 'Chennai - Chennai International Airport - (MAA)', year: 1948 },
  //     // USA
  //     { label: 'John F. Kennedy International Airport (JFK)', year: 1948 },
  //     { label: 'LaGuardia Airport (LGA)', year: 1939 },
  //     { label: 'Newark Liberty International Airport (EWR)', year: 1928 },
  //     { label: 'Los Angeles International Airport (LAX)', year: 1930 },
  //     { label: 'Hollywood Burbank Airport (BUR)', year: 1930 },
  //     { label: 'Chicago O’Hare International Airport (ORD)', year: 1955 },
  //     { label: 'San Francisco International Airport (SFO)', year: 1927 },

  //     // UK
  //     { label: 'Heathrow Airport (LHR)', year: 1946 },
  //     { label: 'Gatwick Airport (LGW)', year: 1933 },
  //     { label: 'London City Airport (LCY)', year: 1987 },
  //     { label: 'Manchester Airport (MAN)', year: 1938 },
  //     { label: 'Birmingham Airport (BHX)', year: 1939 },

  //     // Japan
  //     { label: 'Narita International Airport (NRT)', year: 1978 },
  //     { label: 'Haneda Airport (HND)', year: 1931 },
  //     { label: 'Kansai International Airport (KIX)', year: 1994 },

  //     // UAE
  //     { label: 'Dubai International Airport (DXB)', year: 1960 },
  //     { label: 'Al Maktoum International Airport (DWC)', year: 2010 },
  //     { label: 'Abu Dhabi International Airport (AUH)', year: 1982 },

  //     // France
  //     { label: 'Charles de Gaulle Airport (CDG)', year: 1974 },
  //     { label: 'Orly Airport (ORY)', year: 1932 },
  //     { label: 'Nice Côte d’Azur Airport (NCE)', year: 1946 },

  //     // Australia
  //     { label: 'Sydney Kingsford Smith Airport (SYD)', year: 1920 },
  //     { label: 'Melbourne Airport (MEL)', year: 1970 },
  //     { label: 'Brisbane Airport (BNE)', year: 1988 },

  //     // Canada
  //     { label: 'Toronto Pearson International Airport (YYZ)', year: 1937 },
  //     { label: 'Billy Bishop Toronto City Airport (YTZ)', year: 1939 },
  //     { label: 'Vancouver International Airport (YVR)', year: 1931 },

  //     // China
  //     { label: 'Beijing Capital International Airport (PEK)', year: 1958 },
  //     { label: 'Beijing Daxing International Airport (PKX)', year: 2019 },
  //     { label: 'Shanghai Pudong International Airport (PVG)', year: 1999 },

  //     // Thailand
  //     { label: 'Suvarnabhumi Airport (BKK)', year: 2006 },
  //     { label: 'Don Mueang International Airport (DMK)', year: 1914 },

  //     // Others
  //     { label: 'Hong Kong International Airport (HKG)', year: 1998 },
  //     { label: 'Istanbul Airport (IST)', year: 2018 },
  //     { label: 'Sabiha Gökçen International Airport (SAW)', year: 2001 },
  //     { label: 'Singapore Changi Airport (SIN)', year: 1981 },
  //     { label: 'Kuala Lumpur International Airport (KUL)', year: 1998 },
  //     { label: 'Doha Hamad International Airport (DOH)', year: 2014 },
  //   ];
  // [
  //   {"location": "Kolkata", "airport": "Netaji Subhas Chandra Bose International Airport", "iata_code": "CCU", "state": "West Bengal"},
  //   {"location": "Siliguri", "airport": "Bagdogra International Airport", "iata_code": "IXB", "state": "West Bengal"},
  //   {"location": "Ayodhya", "airport": "Maharishi Valmiki International Airport, Ayodhya Dham", "iata_code": "AYJ", "state": "Uttar Pradesh"},
  //   {"location": "Noida (Delhi NCR)", "airport": "Noida International Airport", "iata_code": "JWR", "state": "Uttar Pradesh"},
  //   {"location": "Lucknow", "airport": "Chaudhary Charan Singh Airport", "iata_code": "LKO", "state": "Uttar Pradesh"},
  //   {"location": "Varanasi", "airport": "Lal Bahadur Shastri Airport", "iata_code": "VNS", "state": "Uttar Pradesh"},
  //   {"location": "Agartala", "airport": "Maharaja Bir Bikram Airport", "iata_code": "IXA", "state": "Tripura"},
  //   {"location": "Hyderabad", "airport": "Rajiv Gandhi International Airport", "iata_code": "HYD", "state": "Telangana"},
  //   {"location": "Chennai", "airport": "Chennai International Airport", "iata_code": "MAA", "state": "Tamil Nadu"},
  //   {"location": "Coimbatore", "airport": "Coimbatore International Airport", "iata_code": "CJB", "state": "Tamil Nadu"},
  //   {"location": "Madurai", "airport": "Madurai Airport", "iata_code": "IXM", "state": "Tamil Nadu"},
  //   {"location": "Tiruchirappalli", "airport": "Tiruchirappalli International Airport", "iata_code": "TRZ", "state": "Tamil Nadu"},
  //   {"location": "Jaipur", "airport": "Jaipur International Airport", "iata_code": "JAI", "state": "Rajasthan"},
  //   {"location": "Amritsar", "airport": "Sri Guru Ram Dass Jee International Airport", "iata_code": "ATQ", "state": "Punjab"},
  //   {"location": "Bhubaneswar", "airport": "Biju Patnaik International Airport", "iata_code": "BBI", "state": "Odisha"},
  //   {"location": "Imphal", "airport": "Imphal Airport", "iata_code": "IMF", "state": "Manipur"},
  //   {"location": "Mumbai", "airport": "Chhatrapati Shivaji Maharaj International Airport", "iata_code": "BOM", "state": "Maharashtra"},
  //   {"location": "Nagpur", "airport": "Dr. Babasaheb Ambedkar International Airport", "iata_code": "NAG", "state": "Maharashtra"},
  //   {"location": "Nashik", "airport": "Ozar Airport", "iata_code": "ISK", "state": "Maharashtra"},
  //   {"location": "Pune", "airport": "Pune Airport", "iata_code": "PNQ", "state": "Maharashtra"},
  //   {"location": "Indore", "airport": "Devi Ahilya Bai Holkar Airport", "iata_code": "IDR", "state": "Madhya Pradesh"},
  //   {"location": "Kannur", "airport": "Kannur International Airport", "iata_code": "CNN", "state": "Kerala"},
  //   {"location": "Kochi", "airport": "Cochin International Airport", "iata_code": "COK", "state": "Kerala"},
  //   {"location": "Kozhikode", "airport": "Calicut International Airport", "iata_code": "CCJ", "state": "Kerala"},
  //   {"location": "Thiruvananthapuram", "airport": "Trivandrum International Airport", "iata_code": "TRV", "state": "Kerala"},
  //   {"location": "Bengaluru", "airport": "Kempegowda International Airport", "iata_code": "BLR", "state": "Karnataka"},
  //   {"location": "Mangaluru", "airport": "Mangaluru International Airport", "iata_code": "IXE", "state": "Karnataka"},
  //   {"location": "Ranchi", "airport": "Birsa Munda Airport", "iata_code": "IXR", "state": "Jharkhand"},
  //   {"location": "Srinagar", "airport": "Srinagar Airport", "iata_code": "SXR", "state": "Jammu and Kashmir"},
  //   {"location": "Ahmedabad", "airport": "Sardar Vallabhbhai Patel International Airport", "iata_code": "AMD", "state": "Gujarat"},
  //   {"location": "Surat", "airport": "Surat Airport", "iata_code": "STV", "state": "Gujarat"},
  //   {"location": "Vadodara", "airport": "Vadodara Airport", "iata_code": "BDQ", "state": "Gujarat"},
  //   {"location": "South Goa", "airport": "Dabolim Airport", "iata_code": "GOI", "state": "Goa"},
  //   {"location": "North Goa", "airport": "Manohar International Airport", "iata_code": "GOX", "state": "Goa"},
  //   {"location": "Delhi NCR", "airport": "Indira Gandhi International Airport", "iata_code": "DEL", "state": "Delhi"},
  //   {"location": "Gaya", "airport": "Gaya Airport", "iata_code": "GAY", "state": "Bihar"},
  //   {"location": "Guwahati", "airport": "Lokpriya Gopinath Bordoloi International Airport", "iata_code": "GAU", "state": "Assam"},
  //   {"location": "Tirupati", "airport": "Tirupati International Airport", "iata_code": "TIR", "state": "Andhra Pradesh"},
  //   {"location": "Vijayawada", "airport": "Vijayawada International Airport", "iata_code": "VGA", "state": "Andhra Pradesh"},
  //   {"location": "Visakhapatnam", "airport": "Visakhapatnam International Airport", "iata_code": "VTZ", "state": "Andhra Pradesh"}
  // ]
  [
    {
      label: "Kolkata - CCU - Netaji Subhas Chandra Bose International Airport",
    },
    { label: "Siliguri - IXB - Bagdogra International Airport" },
    {
      label:
        "Ayodhya - AYJ - Maharishi Valmiki International Airport, Ayodhya Dham",
    },
    { label: "Noida (Delhi NCR) - JWR - Noida International Airport" },
  ];

export default airportsDropdown;
