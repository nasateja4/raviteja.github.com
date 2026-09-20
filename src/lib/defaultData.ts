import { Project, ProfileData, Experience, Education, SkillCategory } from './types';

export const defaultProfile: ProfileData = {
  name: 'Ravi Teja Chevuri',
  title: 'Mechanical Design Engineer',
  subTitle: 'SolidWorks Specialist | CAD Standards & GD&T | Automation & Add-in Developer',
  bio: 'Mechanical Engineer with practical experience in 3D CAD modeling (SolidWorks), detailed drawings, GD&T, and hands-on shop-floor fabrication. Seeking a Mechanical Design role to build accurate, manufacturable physical hardware and assemblies.',
  email: 'nasateja4@gmail.com',
  phone: '+91 7569350964',
  location: 'Visakhapatnam, Andhra Pradesh, India',
  linkedin: 'https://linkedin.com/in/ravi-teja-chevuri',
  naukri: 'https://naukri.com',
  instagram: 'https://instagram.com',
  github: 'https://github.com/nasateja4',
  website: 'https://fastenersstandards.com',
};

export const defaultProjects: Project[] = [
  {
  "specs": [
    {
      "label": "Total Sub-Projects",
      "value": "6 Functional Prototyping Projects"
    },
    {
      "label": "Interactive 3D Models",
      "value": "8 Sketchfab CAD Models"
    },
    {
      "label": "CAD Software",
      "value": "SolidWorks 2024 / Fusion 360"
    },
    {
      "label": "Manufacturing Process",
      "value": "FDM & SLS 3D Printing"
    },
    {
      "value": "PLA+, PETG, ABS",
      "label": "Materials Tested"
    }
  ],
  "shortDescription": "Collection of 6 functional mechanical 3D modeling and additive prototyping projects. Use the interactive project switcher arrows to explore each sub-project with its 3D model, photos, and video demos.",
  "order": 1,
  "subProjects": [
    {
      "id": "agricultural-rover",
      "description": "Collaborated with engineering students from **K.I.T.E. Engineering College** to design and calculate a specialized agricultural rover.\nThe team required a dedicated chassis capable of pulling high drawbar payload loads across irregular soil conditions and negotiating steep field inclines.",
      "model3d": {
        "type": "sketchfab",
        "url": "https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1",
        "title": "Agricultural Rover Full Assembly"
      },
      "shortDescription": "Custom rover chassis and drivetrain engineered for K.I.T.E. College students for agricultural payload pulling and hill climb incline tasks.",
      "models3d": [
        {
          "url": "https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1",
          "title": "Agricultural Rover Full Assembly",
          "type": "sketchfab"
        },
        {
          "title": "Agricultural Rover Chassis",
          "url": "https://sketchfab.com/models/f9d694f2260c42a490f925d8bae35d0e/embed?autospin=1&autostart=1",
          "type": "sketchfab"
        }
      ],
      "specs": [
        {
          "value": "Agricultural Towing & Field Inspection",
          "label": "Application"
        },
        {
          "label": "CAD Software",
          "value": "SolidWorks Parametric Assembly"
        },
        {
          "label": "Engineering Calculations",
          "value": "Drawbar Pull, Incline Gradeability & FEA"
        },
        {
          "value": "Full Rover Assembly & Bare Chassis",
          "label": "3D Models Included"
        }
      ],
      "title": "1. Autonomous Agricultural Based Rover (Rower)",
      "galleryImages": [
        "/static/rower/3dModel.jpeg",
        "/static/rower/IMG_20241119_221533.jpg",
        "/static/rower/car_3d.gif"
      ],
      "videoUrl": "https://www.youtube.com/embed/2D0GofY40FA"
    },
    {
      "model3d": {
        "type": "sketchfab",
        "title": "Smart Health Watch CAD (watch_2)",
        "url": "https://sketchfab.com/models/462b5d8ede60480c998d240b1384288c/embed?autostart=1"
      },
      "videoUrl": "https://www.youtube.com/embed/O3_xjl86TO4",
      "id": "smart-watch",
      "galleryImages": [
        "/static/watch/watch.jpeg",
        "/static/watch/watch.png",
        "/static/watch/watch_explore.jpeg",
        "/static/GPT.jpg"
      ],
      "title": "2. Smart Health Tracking Watch (ESP32-S3 Wearable)",
      "specs": [
        {
          "label": "Processor",
          "value": "ESP32-S3 Mini Module"
        },
        {
          "label": "Sensors Integrated",
          "value": "MAX30102 (SpO2/HR) & MPU6050"
        },
        {
          "label": "Power Architecture",
          "value": "TP4056 USB-C Rechargeable"
        },
        {
          "value": "3D Printed PLA+ Snap-Fit Joint Enclosure",
          "label": "Manufacturing"
        }
      ],
      "description": "Currently developing a wearable smart health tracking watch utilizing the **ESP32-S3**. Features MAX30102 heart rate / SpO2 sensor, MPU6050 accelerometer, TP4056 rechargeable battery circuit, and snap-fit PLA+ enclosure.",
      "shortDescription": "Wearable smart health tracking watch enclosure with snap-fit joints housing ESP32-S3, MAX30102, and MPU6050 sensors."
    },
    {
      "description": "Engineered an upgrade for a CNC laser engraving machine to engrave names and logos onto cylindrical finger rings using a custom scroll-plate 3-jaw chuck designed in Fusion 360.",
      "shortDescription": "Custom 3D-printed 3-jaw self-centering chuck enabling cylindrical ring engraving on a CNC laser engraver, saving ₹2,000–₹3,000 in tooling costs.",
      "videoUrl": "https://www.youtube.com/embed/S4zS77OUl8o",
      "galleryImages": [
        "/static/3d_printing/IMG_3563.JPG",
        "/static/3d_printing/IMG_3625.JPG"
      ],
      "id": "3-jaw-chuck",
      "specs": [
        {
          "value": "Saved ₹2,000 – ₹3,000 in hardware tooling",
          "label": "Commercial Savings"
        },
        {
          "label": "Mechanism Type",
          "value": "Scroll Plate 3-Jaw Self-Centering Chuck"
        },
        {
          "value": "High Infill Rigid PLA",
          "label": "Print Material"
        },
        {
          "label": "Application",
          "value": "Rotary Axis Cylindrical Ring Engraving"
        }
      ],
      "title": "3. Lathe 3-Jaw Chuck for Laser Engraving Machine"
    },
    {
      "videoUrl": "https://youtube.com/embed/-SqQ3uOOTR8",
      "id": "rotating-display-bed",
      "title": "4. Rotating Bed for Model Display & Video Capture",
      "specs": [
        {
          "value": "360° Continuous Smooth Rotation",
          "label": "Rotation Span"
        },
        {
          "label": "CAD Tool",
          "value": "Autodesk Fusion 360"
        },
        {
          "value": "Cinematic Hardware Review & Presentation",
          "label": "Function"
        }
      ],
      "description": "Created a smooth concentric 360-degree rotating display bed to present 3D CAD prototypes dynamically during high-resolution video recordings.",
      "galleryImages": [
        "/static/3d_printing/IMG_3564.JPG",
        "/static/3d_printing/IMG_3626.JPG"
      ],
      "shortDescription": "Concentric 360-degree rotating turntable bed designed in Fusion 360 for dynamic CAD model inspection and video recording.",
      "model3d": {
        "type": "sketchfab",
        "title": "3D Printed Rotating Display Bed",
        "url": "https://sketchfab.com/models/f9a45683183e4bc3a382eedf9c332771/embed?autospin=1&autostart=1"
      }
    },
    {
      "id": "cnc-z-axis",
      "title": "5. CNC Laser Engraver Z-Axis Upgrade for Wood Carving",
      "specs": [
        {
          "value": "1 mm per pass controlled depth",
          "label": "Milling Depth"
        },
        {
          "label": "Drive Mechanism",
          "value": "Precision Lead Screw with Anti-Backlash Nut"
        },
        {
          "value": "Reinforced 3D Printed Spindle Mount",
          "label": "Structural Carriage"
        }
      ],
      "shortDescription": "Rigid Z-axis gantry carriage upgrade designed in Fusion 360 accommodating a high-RPM spindle motor for 1mm per pass depth milling.",
      "model3d": {
        "url": "https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1",
        "title": "CNC Z-Axis Upgrade Assembly",
        "type": "sketchfab"
      },
      "description": "Upgraded the functionality of a 2-axis desktop CNC laser machine to perform precision wood carving and milling with a controlled depth of 1mm per pass in hardwoods and soft aluminum.",
      "galleryImages": [
        "/static/leaser_cnc/laser.png",
        "/static/leaser_cnc/IMG_3565.JPG",
        "/static/leaser_cnc/IMG_3566.JPG",
        "/static/leaser_cnc/IMG_3582.JPG"
      ],
      "videoUrl": "https://youtube.com/embed/zGyGgTdxowI"
    },
    {
      "galleryImages": [
        "/static/arm.jpg",
        "/static/3d_printing/IMG_3625.JPG"
      ],
      "models3d": [
        {
          "url": "https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1",
          "title": "Stepper Motor v7 (Robotic Joint)",
          "type": "sketchfab"
        },
        {
          "type": "sketchfab",
          "url": "https://sketchfab.com/models/bc19dc85c3f74694924033dab609fb1a/embed?autospin=1&autostart=1",
          "title": "Cylindrical Stepper Motor v1"
        },
        {
          "type": "sketchfab",
          "title": "NEMA 21 Stepper Motor v1",
          "url": "https://sketchfab.com/models/61e9fc0271ed49e6af784659e9026f69/embed?autospin=1&autostart=1"
        }
      ],
      "shortDescription": "Tailored stepper motor actuator housings (Stepper Motor v7, Cylindrical v1, NEMA 21) designed in SolidWorks for robotic joint alignment.",
      "model3d": {
        "type": "sketchfab",
        "url": "https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1",
        "title": "Stepper Motor v7 (Robotic Joint)"
      },
      "title": "6. Custom Stepper Motors for 6-Axis Robotic Arm",
      "specs": [
        {
          "label": "3D Models Included",
          "value": "Stepper Motor v7, Cylindrical v1, NEMA 21"
        },
        {
          "value": "SolidWorks 2024",
          "label": "CAD Tool"
        },
        {
          "value": "Robotic Manipulator Joint Packaging",
          "label": "Application"
        }
      ],
      "description": "Custom stepper motor outer housings and mounting flanges designed in SolidWorks. Tailored bolt circle diameters, shaft clearances, and bearing pockets interface with joint reducers.",
      "id": "stepper-motors",
      "videoUrl": "https://youtube.com/embed/3BYo8GMtsGc"
    },
    {
      "galleryImages": [],
      "model3d": {
        "url": "https://sketchfab.com/models/2e30b91bc1004e47ad8c26cf396457e8/embed?autospin=1&autostart=1",
        "title": "Mini Peltier Air Conditioner – Water Cooled Thermoelectric Cooling System",
        "type": "sketchfab"
      },
      "description": "**Mini Peltier Air Conditioner – Water Cooled Thermoelectric Cooling System**\n\nA compact **mini air-conditioning concept model based on Peltier (thermoelectric) cooling technology**.\n\nThe system uses a **Peltier module** to generate a temperature difference between the hot and cold sides. A **water-cooling circuit** is used to transfer and dissipate heat from the hot side, while the cold side is utilized for cooling the surrounding air.\n\n### Main Components\n\n* Peltier / Thermoelectric Cooling Module\n* Water Cooling Block\n* Water Coolant Circuit\n* Cold-Side Heat Exchanger\n* Hot-Side Heat Dissipation System\n* Cooling Fan\n* Water Pump\n* Tubing / Coolant Lines\n* Compact Enclosure\n\n\n### Concept\nThe objective of this design is to create a **small, compact cooling system** suitable for applications where conventional compressor-based air conditioning may not be practical.\n\nThis 3D model represents the **mechanical design and arrangement of the system components** and can be further developed into a functional prototype.\n\n**Technology:** Thermoelectric / Peltier Cooling\n**Cooling Method:** Water-Cooled Heat Dissipation\n**Application:** Mini AC / Compact Cooling System\n**CAD:** 3D Mechanical Design",
      "id": "mini-peltier-air-conditioner-water-cooled-thermoelectric-cooling-system",
      "models3d": [
        {
          "url": "https://sketchfab.com/models/2e30b91bc1004e47ad8c26cf396457e8/embed?autospin=1&autostart=1",
          "title": "Mini Peltier Air Conditioner – Water Cooled Thermoelectric Cooling System",
          "type": "sketchfab"
        },
        {
          "type": "sketchfab",
          "url": "https://sketchfab.com/models/a51a965888164d48b3abd2a614bf69cb/embed?autospin=1&autostart=1",
          "title": "Mini Peltier Air Conditioner – Water Cooled Thermoelectric Cooling System 2"
        }
      ],
      "tools": [
        "SolidWorks",
        "Fusion 360",
        "Ultimaker Cura",
        "3D Printing"
      ],
      "specs": [
        {
          "value": "Thermoelectric / Peltier Cooling",
          "label": "Technology"
        },
        {
          "value": "Water-Cooled Heat Dissipation",
          "label": "Cooling Method"
        },
        {
          "value": "Mini AC / Compact Cooling System",
          "label": "Application"
        },
        {
          "value": "3D Mechanical Design",
          "label": "CAD"
        }
      ],
      "title": "Mini Peltier Air Conditioner – Water Cooled Thermoelectric Cooling System",
      "shortDescription": "The system uses a Peltier module to generate a temperature difference between the hot and cold sides. A water-cooling circuit is used to transfer and dissipate heat from the hot side, while the cold side is utilized for cooling the surrounding air."
    }
  ],
  "featured": true,
  "galleryImages": [
    "/static/rower/3dModel.jpeg",
    "/static/rower/IMG_20241119_221533.jpg",
    "/static/watch/watch.jpeg",
    "/static/watch/watch_explore.jpeg",
    "/static/3d_printing/IMG_3563.JPG",
    "/static/3d_printing/IMG_3564.JPG",
    "/static/3d_printing/IMG_3625.JPG",
    "/static/3d_printing/IMG_3626.JPG"
  ],
  "id": "3d-printing-modeling",
  "category": "3D CAD & Printing",
  "heroImage": "/static/3dModel.jpeg",
  "slug": "3d-printing-modeling",
  "title": "3D Modeling & Additive Prototyping Projects",
  "fullDescription": "### Project Overview\nThis section showcases a collection of 3D printing projects I have undertaken to solve practical problems and explore the capabilities of additive manufacturing. These projects range from creating custom accessories for existing machinery to designing components for new systems. The primary motivation behind these projects is to find cost-effective and tailored solutions that meet specific requirements. I have utilized various 3D printers, including FDM (Fused Deposition Modeling) technology, and experimented with different materials like PLA and ABS to achieve the desired functionality and durability. The design process typically involves CAD software such as SolidWorks and Fusion 360, followed by slicing and printing using software like Cura or PrusaSlicer.\n\n### Key Skills & Learnings:\n- **Advanced CAD Modeling**: Designing for additive manufacturing, including functional constraints, snap fits, and mechanical linkages.\n- **Material Selection**: Understanding the properties of different 3D printing filaments (PLA, ABS, PETG) and selecting the optimal material for thermal and mechanical load conditions.\n- **Slicing & Optimization**: Fine-tuning slicing parameters (layer height, infill geometry and density, print speed, nozzle temp) to achieve maximum structural integrity and surface finish.\n- **Reverse Engineering**: Custom components designed to seamlessly integrate with existing machines and commercial hardware.\n- **Iterative Rapid Prototyping**: Solving mechanical challenges through quick design iterations and functional testing.",
  "date": "2024",
  "tools": [
    "SolidWorks",
    "Fusion 360",
    "Blender",
    "ANSYS FEA",
    "3D Printing (FDM, SLS)"
  ],
  "model3d": {
    "type": "sketchfab",
    "url": "https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1",
    "title": "Autonomous Agricultural Rover (Rower)"
  },
  "models3d": [
    {
      "url": "https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1",
      "title": "Autonomous Agricultural Rover (Rower)",
      "type": "sketchfab"
    }
  ]
},
  {
    id: 'ev-conversion-maruti-800',
    slug: 'ev-conversion-maruti-800',
    title: 'Electric Vehicle Conversion - Maruti 800',
    shortDescription: 'Complete electric vehicle retrofit of a Maruti 800 petrol car, leading an 18-member engineering team to design custom gearbox mounts, ANSYS FEA simulations, and electric powertrain integration.',
    fullDescription: `### Project Overview
This final year mechanical engineering project involved the complete conversion of a Maruti 800 petrol car into a fully functional electric vehicle. Driven by a commitment to promote sustainable transportation and gain practical experience in electric vehicle technology, our team undertook this challenging yet rewarding endeavor. The conversion process encompassed the removal of the internal combustion engine and related components, followed by the design and integration of a suitable electric motor, battery pack, motor controller, and other necessary electrical systems. The successful completion of this project not only resulted in a working EV but also earned university recognition for its innovation and technical execution.

### Key Contributions & Tasks:
- **Team Leadership & Project Management**: As the team leader for this project involving 18 members, I took the initiative in defining project objectives, delegating tasks based on individual interests and skills, and ensuring effective communication and collaboration throughout the project lifecycle. My leadership was instrumental in successfully meeting project milestones and achieving our final goal.
- **Design and Development of the Gearbox Mount**: Identified the critical challenge of connecting the electric motor to the existing gearbox. I spearheaded the design and development of a custom "Gearbox Mount" component using Fusion 360. This component was designed with simplicity and ease of manufacturing in mind, as no suitable off-the-shelf solution existed. The design focused on effectively transmitting power from the motor shaft to the transmission shaft while ensuring structural integrity.
- **Structural Analysis of the Gearbox Mount**: Conducted comprehensive structural analysis of the designed Gearbox Mount using ANSYS. The simulations aimed to validate the component's durability and safety under operational loads. Key findings included a maximum deformation of 0.01 mm and a maximum shear stress of 6.5 MPa, both well within acceptable limits, ensuring the reliability of the power transmission system.
- **Component Integration**: Played a key role in the physical integration of the electric motor, battery pack, and motor controller into the Maruti 800 chassis.
- **Testing & Validation**: Contributed to the testing and validation phase, which included comprehensive road and load testing. The results demonstrated the successful operation of the converted EV, meeting our initial performance expectations.

### Technical Details of the Gearbox Mount:
The custom-designed "Gearbox Mount" was crucial for the project's success. Key design considerations included:
- **Material Selection**: Mild steel was chosen for the mount due to its suitability for the application. The material was selected based on its mechanical properties, availability, and cost.
- **Design Simplicity**: The design prioritized simple geometries and manufacturing processes to avoid complexities and ensure feasibility with available resources.
- **Power Transmission Efficiency**: The mount was designed to ensure a direct and efficient transfer of power from the electric motor's shaft to the gearbox input shaft.
- **Structural Integrity**: As validated by the ANSYS simulations, the design could withstand the expected torsional and shear stresses during vehicle operation.

The successful design and analysis of the Gearbox Mount were pivotal in ensuring the overall success of the EV conversion project. The mount's performance was critical in achieving the desired power transmission efficiency and vehicle performance.`,
    category: 'Engineering Projects',
    heroImage: '/static/EV_car.JPG',
    galleryImages: [
      '/static/EV_car.JPG',
      '/static/group.png',
      '/static/news.png',
      '/static/award.png',
      '/static/TBNL9271.JPG',
      '/static/EV_vehical/IMG_3262.JPG',
      '/static/EV_vehical/IMG_3263.JPG',
      '/static/EV_vehical/IMG_3265.JPG',
      '/static/EV_vehical/IMG_2140.JPG',
      '/static/EV_vehical/IMG_2590.JPG',
      '/static/EV_vehical/IMG_2600.JPG',
      '/static/EV_vehical/IMG_2603.JPG',
      '/static/EV_vehical/IMG_3353.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/7_O1lP-1Th8?si=NZfBGNgome2cuAVv',
    tools: ['Fusion 360', 'ANSYS FEA', 'Electric Vehicle Components', 'Power Transmission', 'Vehicle Conversion', 'Project Management'],
    specs: [
      { label: 'Team Leadership', value: 'Lead Engineer (18-Member Team)' },
      { label: 'Powertrain', value: '1 kW, 49 V BLDC Motor' },
      { label: 'Gearbox Mount Material', value: 'Mild Steel (Custom Machined)' },
      { label: 'ANSYS Max Deformation', value: '0.01 mm' },
      { label: 'ANSYS Max Shear Stress', value: '6.5 MPa' },
      { label: 'Donor Vehicle Chassis', value: 'Maruti 800 Petrol' },
      { label: 'Recognition', value: 'University Innovation Award & News Press' },
    ],
    featured: true,
    date: '2024',
    order: 2,
  },
  {
    id: 'cnc-laser-cutter',
    slug: 'cnc-laser-cutter',
    title: 'Wood Laser Engraving Machine (Arduino CNC Laser Cutter)',
    shortDescription: 'Built during college to engrave logos and vector images on wood and cardboard and cut 2–3 mm softwood with precision using salvaged TVS printer axes and Arduino Uno.',
    fullDescription: `### Project Overview
**Project Name:** Wood Laser Engraving Machine
I built this machine during my college days to support my basic needs. It is capable of engraving logos and vector images on wood and cardboard, and can cut through 2–3 mm softwood with precision.

### Hardware Components:
- **Laser Module**: 0.5W Blue Laser, 210mA, ~445–450 nm
- **Stepper Motors**: NEMA17 high torque
- **Motor Drivers**: TB6600 microstepping drivers
- **Controller**: Arduino Uno
- **Mechanical Frame**: TVS Matrix Printer Axes
- **Drive System**: Belt Drive
- **Working Speed**: 5 cm/second
- **Work Area**: 23 × 30 cm
- **Bed Material**: Wood
- **Calibration Tools**: Spirit Level, Caliper

### Software Used:
- **Firmware**: OpenBuilds GRBL (for Arduino Uno)
- **Control Software**: OpenBuilds Control
- **Design to G-code**: Inkscape (with G-code extension)

### Mechanical Design:
The axes were salvaged from old TVS Matrix Printers, helping us save ₹5000–₹6000 per axis. The wooden bed was precisely leveled using a spirit level and calibrated with a caliper. A belt drive system ensures smooth motion.

### Working Principle:
- **1. Vector Design**: Create logo/vector in Inkscape.
- **2. G-Code Generation**: Convert it to G-code using Inkscape’s plugin.
- **3. Controller Stream**: Load G-code into OpenBuilds Control.
- **4. GRBL Interpretation**: Arduino Uno interprets G-code via GRBL firmware.
- **5. Precision Execution**: Laser engraves or cuts as instructed.

### Performance & Results:
- Successfully engraved on wood and cardboard.
- Cut 2–3 mm softwood cleanly.
- Laser power and speed had to be tuned for best results.

### Real-World Research & Business Idea:
I conducted local market research before starting this project. While shopkeepers charged ₹2500–₹3000 for a 10×15 cm engraving, we offered the same for ₹1500, with student discounts (₹800–₹1000). This helped us earn while learning.

### Challenges Faced:
- Axis alignment and calibration on a wooden base.
- Laser power limitation required a lot of testing.
- Budget constraints solved using repurposed printer parts.

### Future Improvements:
- Upgrade to 2.5W or 5W laser for deeper cuts.
- Add cooling or air assist system.
- Include protective casing and emergency stop.
- Implement auto-homing and limit switches.

### Conclusion:
This project helped me build hands-on engineering and entrepreneurship skills. I successfully designed a low-cost laser engraving machine that delivered practical value while staying within a student budget.`,
    category: 'Engineering Projects',
    heroImage: '/static/laser.png',
    galleryImages: [
      '/static/laser.png',
      '/static/leaser_cnc/IMG_3565.JPG',
      '/static/leaser_cnc/IMG_3566.JPG',
      '/static/leaser_cnc/IMG_3582.JPG',
    ],
    videoUrl: 'https://youtube.com/embed/feYczSyh0Ps',
    tools: ['Arduino Uno', 'GRBL Firmware', 'OpenBuilds Control', 'Inkscape (with G-code extension)', 'TB6600 Drivers', 'NEMA17 Stepper Motors', 'Belt Drive'],
    specs: [
      { label: 'Laser Module', value: '0.5W Blue Laser, 210mA, ~445–450 nm' },
      { label: 'Stepper Motors', value: 'NEMA17' },
      { label: 'Motor Drivers', value: 'TB6600' },
      { label: 'Controller', value: 'Arduino Uno' },
      { label: 'Mechanical Frame', value: 'TVS Matrix Printer Axes' },
      { label: 'Drive System', value: 'Belt Drive' },
      { label: 'Working Speed', value: '5 cm/second' },
      { label: 'Work Area', value: '23 × 30 cm' },
      { label: 'Bed Material', value: 'Wood' },
      { label: 'Calibration Tools', value: 'Spirit Level, Caliper' },
    ],
    featured: true,
    date: '2023',
    order: 3,
  },
  {
    id: 'bom-automation',
    slug: 'bom-automation',
    title: 'Automating Project Tracking with Google Sheets using Python',
    shortDescription: 'Automating tracking of 3,000+ part numbers from a client Master BOM by developing a Python script that verifies local .SLDASM and .STEP files and updates Google Sheets in real-time.',
    fullDescription: `### Project Overview
This project was built to solve a major issue in tracking the creation status of more than 3000 part numbers listed in a client-provided Master BOM. The parts were being created and saved locally as SolidWorks assembly or STEP files, but there was no clear way to track which ones were completed. To automate and simplify this, I developed a script in Python that checks the local system for assembly files and updates a Google Sheet accordingly. The script verifies each part number listed in Column A and updates Column B with "Created" or "Not Created". It also fills in the file path, file type (SLDASM or STEP), and the date it was found.

### Key Contributions & Tasks:
- **Gap Identification**: Identified a gap in tracking part creation from the Master BOM provided by the client.
- **Local Folder Scanner**: Developed a Python script that scans local folders for .SLDASM and .STEP files.
- **BOM Verification**: Matched these files with the part numbers listed in Google Sheets (Column A).
- **Automated Updates**: Automatically updated the Google Sheet with part status ("Created"/"Not Created"), file path, file type, and creation date.
- **Google Sheets API**: Used Google Sheets API to authenticate and push updates from the script to the spreadsheet.
- **Runtime Flexibility**: Made the tool user-friendly by prompting for the source path at runtime.

### Technologies Used:
- **Python**: Core script logic and directory scanning.
- **Google Sheets API**: Cloud authentication and spreadsheet synchronization.
- **Google Apps Script**: Extended sheet formatting and workflow integration.

### Challenges & Solutions:
One of the main challenges was that there was no direct way to monitor the progress of part creation from a long list of part numbers. We were dealing with a large number of files stored in multiple folders. I solved this by automating the process with Python and integrating it with Google Sheets, allowing real-time updates and reducing manual tracking effort. Ensuring correct authentication and file type detection (SLDASM vs STEP) was another technical hurdle, which was handled with proper logic and testing.`,
    category: 'Engineering Projects',
    heroImage: '/static/bom.png',
    galleryImages: [
      '/static/bom.png',
    ],
    videoUrl: 'https://www.youtube.com/embed/zRhuhkMxTAc?si=9mRyQHGl9457Ruwi',
    tools: ['Python', 'Google Sheets API', 'Google Apps Script'],
    specs: [
      { label: 'Part Tracking Volume', value: '3,000+ Master BOM Parts' },
      { label: 'File Formats Monitored', value: '.SLDASM (SolidWorks) and .STEP' },
      { label: 'Google Sheet Column A', value: 'Part Number from Client Master BOM' },
      { label: 'Google Sheet Column B', value: 'Status ("Created" / "Not Created")' },
      { label: 'Metadata Extracted', value: 'File Path, File Type, Discovery Date' },
      { label: 'Authentication', value: 'Google Sheets API OAuth Credentials' },
    ],
    featured: true,
    date: '2024',
    order: 4,
  },
  {
    id: '6-axis-robotic-arm',
    slug: '6-axis-robotic-arm',
    title: '6-Axis Robotic Arm Development',
    shortDescription: 'Modular 6-axis robotic arm modeled in Fusion 360 with 3D-printed PLA structure, C firmware, stepper motors, TB6600 drivers, encoder feedback, and ANSYS structural simulation.',
    fullDescription: `### Project Overview
This ongoing project involves the development of a 6-axis robotic arm with the goal of enhancing my engineering skills across various domains including mechanical design, microcontrollers, feedback systems, and structural analysis. The robotic arm is being modeled in Fusion 360 with a complete 3D-printed structure using PLA material, making it lightweight and modular. I am designing and analyzing linkages, joints, and actuators, while also focusing on structural integrity using ANSYS for static and dynamic load analysis. The control system is based on microcontrollers and stepper motors, with firmware written in C. I'm integrating sensors (like encoders and limit switches) for real-time feedback. The long-term vision includes precise pick-and-place operations, automation tasks, and educational demonstrations.

### Key Contributions & Tasks:
- **CAD Kinematics & Modularity**: Currently designing the robotic arm structure and linkages in Fusion 360 with a focus on joint flexibility, modularity, and 3D-printing feasibility.
- **Actuators & Electronics**: Selected appropriate stepper motors, microcontrollers, and TB6600 motor drivers for optimal torque and precision.
- **Control Logic & Firmware**: Developed control logic and motion planning algorithms using the C programming language.
- **Sensors & Feedback**: Integrated various sensors for feedback including rotary encoders, end-stop switches, and limit sensors.
- **ANSYS Structural Analysis**: Utilized ANSYS for structural analysis — evaluating stresses, strains, and deformation under different loading conditions to optimize design.
- **Additive Manufacturing**: Fabricated parts using 3D printing (PLA), ensuring accurate tolerance for smooth movement and alignment.
- **Prototyping & Testing**: Planning the prototype and testing phase for individual axes before assembling the full robotic system.

### Technologies Used:
- **Fusion 360**: 3D CAD modeling of linkages, joints, and motor mounts.
- **C Programming**: Low-level motion control algorithms and kinematics.
- **Arduino / Microcontroller**: Master microcontroller orchestrating motor step and direction signals.
- **Step Motor Control**: High-torque stepper motors driven by TB6600 drivers.
- **3D Printing (PLA)**: Lightweight modular structural segments.
- **ANSYS Structural Analysis**: Static and dynamic stress and deflection simulations.
- **Sensors & Feedback**: Real-time rotary encoders and homing limit switches.`,
    category: 'Engineering Projects',
    heroImage: '/static/arm.jpg',
    galleryImages: [
      '/static/arm.jpg',
    ],
    tools: ['Fusion 360', 'C Programming', 'Arduino / Microcontroller', 'Step Motor Control', '3D Printing (PLA)', 'ANSYS Structural Analysis', 'Sensors & Feedback'],
    specs: [
      { label: 'Kinematics', value: '6-Axis Articulated Manipulator (6-DOF)' },
      { label: 'CAD Software', value: 'Autodesk Fusion 360' },
      { label: 'Structure Material', value: 'Modular 3D-Printed PLA' },
      { label: 'Actuators', value: 'Stepper Motors with TB6600 Drivers' },
      { label: 'Firmware Language', value: 'C' },
      { label: 'FEA Simulation', value: 'ANSYS Structural Analysis' },
      { label: 'Sensors Integrated', value: 'Rotary Encoders, End-Stop Switches, Limit Sensors' },
    ],
    featured: false,
    date: '2024',
    order: 5,
  },
  {
    id: 'advanced-thread-wizard',
    slug: 'advanced-thread-wizard',
    title: 'SolidWorks Macro Automation',
    shortDescription: 'Custom SolidWorks macros automating configuration part export for open assemblies and batch directories, paired with advanced Thread Wizard automation.',
    fullDescription: `### Project Overview
In this project, we worked with SolidWorks assembly files (\`.SLDASM\`) that contained multiple configurations. SolidWorks Premium already has a built-in feature to export each configuration as a separate part file, but I recreated this functionality using custom macros.

I wrote two types of macros using the SolidWorks API:

- **1. Macro for Open Assemblies**: When an assembly file is already open in SolidWorks and this macro is executed, it prompts the user for a destination folder. Each configuration in the open assembly is then saved as an individual \`.SLDPRT\` file using the configuration name.
- **2. Batch Conversion Macro**: This macro is designed to handle multiple files. It asks for a *source folder* (containing the assemblies with configurations) and a *destination folder*. It opens each assembly one by one, extracts the configured parts, and saves them as individual \`.SLDPRT\` files in a newly created folder named after each assembly.

### Key Contributions & Tasks:
- **Macro Logic Development**: Developed macro logic to automate the export of configuration parts into \`.SLDPRT\` files.
- **Live & Batch Scenarios**: Handled both live and batch scenarios with user prompts for file paths and folders.
- **Naming & Organization**: Ensured naming consistency and organization by creating folders for each assembly.
- **Optimization**: Optimized the script to handle large assemblies and multiple configurations efficiently.
- **Thread Wizard Add-in**: In addition to configuration macros, engineered the Advanced Thread Wizard Add-in, reducing thread generation time from 15–20 minutes down to 20–40 seconds across ISO and ASME standards.

### Technologies Used:
- **SolidWorks API**: Programmatic manipulation of assemblies, components, and configurations.
- **VBA**: Visual Basic for Applications scripting for built-in macro execution.
- **ChatGPT (Assistance)**: AI-assisted API research and rapid prototyping.
- **Automation Scripting**: Batch directory processing and file system handling.

### Challenges & Solutions:
Handling multiple configurations within assemblies and maintaining organized output required careful scripting. Another challenge was ensuring the macros worked reliably in both open and batch modes. I addressed these using SolidWorks API features for configurations and proper folder management logic, ensuring smooth automation even across complex assemblies.`,
    category: 'Engineering Projects',
    heroImage: '',
    galleryImages: [],
    videoUrl: 'https://www.youtube.com/embed/bX4SZfrD5_c?si=janjobJoquCv1-Fs',
    tools: ['SolidWorks API', 'VBA', 'ChatGPT (Assistance)', 'Automation Scripting'],
    specs: [
      { label: 'Macro 1', value: 'Open Assembly Configuration Exporter' },
      { label: 'Macro 2', value: 'Batch Folder Assembly Exporter' },
      { label: 'Development API', value: 'SolidWorks API with VBA' },
      { label: 'Export Format', value: 'Individual .SLDPRT Part Files' },
      { label: 'Folder Organization', value: 'Auto-generates folders per assembly' },
      { label: 'Batch Processing', value: '80–100+ assemblies per automated run' },
    ],
    featured: true,
    date: '2024',
    order: 6,
  },
  {
    id: 'fasteners-standards',
    slug: 'fasteners-standards',
    title: 'Fasteners Standards — Engineering Reference & CAD Tool',
    shortDescription: 'Engineering reference platform (fastenersstandards.com) providing precise thread dimensions, tolerances, and downloadable SolidWorks CAD models with 25–30 daily visitors.',
    fullDescription: `### FastenersStandards.com — Web & CAD Reference Platform
Live Website: [https://fastenersstandards.com](https://fastenersstandards.com)

Developed and deployed **fastenersstandards.com**, a specialized online engineering reference tool created to solve the industry pain-point of fragmented and unreliable thread-standard data available online for CAD designers.

### Project Milestones & Functionality:
- **Comprehensive Standard Extraction**: Studied ISO and ASME standards in depth to extract precise thread data for:
  - Unified National (UN, UNC, UNF, UNEF) internal and external threads
  - Metric ISO 68-1 and ISO 965 tolerance classes (4h, 6g, 6H, 7H)
  - Trapezoidal (TR) and lead-screw thread geometries
- **Direct CAD Asset Distribution**: Provided downloadable, verified **SolidWorks part and profile files** so mechanical design engineers can immediately incorporate standard thread geometry into their production models.
- **Real-World Impact**: Receives **25–30 daily active engineering visitors** across mechanical and aerospace design communities.
- **Continuous Expansion**: Built using modern web technologies and AI-assisted development tools, regularly updated with fastener specifications, bolt grades, and clearance hole charts.`,
    category: 'Engineering Projects',
    heroImage: '',
    galleryImages: [],
    tools: ['ASME Standards', 'ISO Standards', 'SolidWorks CAD Data', 'Web Development', 'Engineering Calculation'],
    externalUrl: 'https://fastenersstandards.com',
    specs: [
      { label: 'Live Website', value: 'fastenersstandards.com' },
      { label: 'Daily Engineering Visitors', value: '25 – 30 active daily users' },
      { label: 'Standards Covered', value: 'ASME B1.1, ISO 68-1, ISO 2901/2903' },
      { label: 'Deliverables', value: 'Online Dimension Engine & SolidWorks Files' },
    ],
    featured: true,
    date: '2024',
    order: 7,
  },
];

export const defaultExperiences: Experience[] = [
  {
    id: 'sagex',
    title: 'Junior Design Engineer',
    company: 'Sagex',
    location: 'Diamond Park, Visakhapatnam | September 2024 – Present',
    period: 'Sep 2024 – Present',
    highlights: [
      'Create parametric 3D CAD models and assemblies in SolidWorks from 2D drawings, specifications, and customer requirements, covering 1,500+ assemblies and 200+ components.',
      'Model connector components including Micro-D, Nano-D, rectangular, circular, PCB-mount, wired coaxial, and select MIL-spec connectors, with housings, pins, insulators, and adapters.',
      'Apply ASME, ISO standards along with GD&T to maintain typical tolerances of ±0.05 mm and design intent.',
      'Review 3D models against engineering drawings to verify critical dimensions, fit, and feature accuracy.',
      'Develop custom SolidWorks VBA macros to automate repetitive modeling and drawing tasks, reducing one task from about 8 hours to 1 hour.',
    ],
  },
  {
    id: 'hoble',
    title: 'CNC Bending & Tube Mill Operator',
    company: 'Hoble Bellows Company',
    location: 'VSEZ, Duvvada, Visakhapatnam | May 2024 – July 2024',
    period: 'May 2024 – July 2024',
    highlights: [
      'Operated CNC bending machines to fabricate industrial, automotive, and marine engine components, including marine silencer parts with 5–6 bends each.',
      'Managed tube mill processes, forming rectangular sheet metal into circular and custom tube profiles from 0.5–1.5 mm material.',
      'Set up the machine for about 3 different parts, including tooling adjustments, routine maintenance, and on-line troubleshooting.',
      'Verified bend dimensions and part geometry against production drawings using checking dies/fixtures.',
    ],
  },
];

export const defaultEducation: Education[] = [
  {
    id: 'btech',
    degree: 'B.Tech in Mechanical Engineering',
    institution: 'Dr. B.R Ambedkar University, Srikakulam, India',
    period: 'June 2021 – April 2024',
    grade: 'GPA: 7.75 / 10',
  },
  {
    id: 'diploma',
    degree: 'Diploma in Mechanical Engineering',
    institution: 'Thandrapaparaya Polytechnic (SBTET), Vizianagaram, India',
    period: 'June 2018 – April 2021',
    grade: 'Percentage: 71%',
  },
  {
    id: 'highschool',
    degree: 'High School (C.B.S.E)',
    institution: 'D.A.V. Centenary Public School, Visakhapatnam, India',
    period: '2017 – 2018 March',
    grade: 'C.B.S.E Board',
  },
];

export const defaultSkillCategories: SkillCategory[] = [
  {
    category: 'Design & Modeling Software',
    skills: [
      { name: 'SolidWorks (Parametric, Assembly, Sheet Metal, Configurations)', level: 'Expert' },
      { name: 'Fusion 360 & CATIA', level: 'Proficient' },
      { name: 'AutoCAD (Detailed Drafting)', level: 'Advanced' },
      { name: 'Blender (3D Modeling & Rendering)', level: 'Proficient' },
    ],
  },
  {
    category: 'Engineering Standards & Visualization',
    skills: [
      { name: 'ASME Standards & ISO Standards', level: 'Expert' },
      { name: 'GD&T (Geometric Dimensioning & Tolerancing)', level: 'Advanced' },
      { name: 'SolidWorks Visualize & Blender Rendering', level: 'Advanced' },
    ],
  },
  {
    category: 'Simulation & Manufacturing',
    skills: [
      { name: 'ANSYS (CFD, Static & Transient Structural - basic)', level: 'Proficient' },
      { name: 'CNC Programming & G-Code', level: 'Advanced' },
      { name: 'CNC Machining, Bending & Tube Mill Rolling', level: 'Hands-on' },
      { name: '3D Printing (FDM, SLS)', level: 'Expert' },
    ],
  },
  {
    category: 'Programming & CAD Add-ins',
    skills: [
      { name: 'SolidWorks API & Add-in Development', level: 'Advanced' },
      { name: 'C# / VB.NET for SolidWorks Add-ins', level: 'Advanced' },
      { name: 'VBA Macros Automation', level: 'Expert' },
      { name: 'Python (Basic)', level: 'Intermediate' },
    ],
  },
];
