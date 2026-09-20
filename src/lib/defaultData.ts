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
    id: '3d-printing-modeling',
    slug: '3d-printing-modeling',
    title: '3D Modeling & Additive Prototyping Projects',
    shortDescription: 'Collection of 6 functional mechanical 3D modeling and additive prototyping projects. Use the interactive project switcher arrows to explore each sub-project with its 3D model, photos, and video demos.',
    fullDescription: `A comprehensive portfolio of 6 physical hardware prototyping projects spanning wearable IoT enclosures, autonomous agricultural rovers, custom lathe fixtures, motorized display turntables, CNC carving units, and robotic actuator housings.`,
    category: '3D CAD & Printing',
    heroImage: '/static/rower/3dModel.jpeg',
    galleryImages: [
      '/static/rower/3dModel.jpeg',
      '/static/rower/IMG_20241119_221533.jpg',
      '/static/watch/watch.jpeg',
      '/static/watch/watch_explore.jpeg',
      '/static/3d_printing/IMG_3563.JPG',
      '/static/3d_printing/IMG_3564.JPG',
      '/static/3d_printing/IMG_3625.JPG',
      '/static/3d_printing/IMG_3626.JPG',
    ],
    tools: ['SolidWorks', 'Fusion 360', 'Blender', 'ANSYS FEA', '3D Printing (FDM, SLS)'],
    model3d: {
      type: 'sketchfab',
      url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
      title: 'Autonomous Agricultural Rover (Rower)',
    },
    subProjects: [
      {
        id: 'agricultural-rover',
        title: '1. Autonomous Agricultural Based Rover (Rower)',
        shortDescription: 'Custom rover chassis and drivetrain engineered for K.I.T.E. College students for agricultural payload pulling and hill climb incline tasks.',
        description: `Collaborated with engineering students from **K.I.T.E. Engineering College** to design and calculate a specialized agricultural rover.
The team required a dedicated chassis capable of pulling high drawbar payload loads across irregular soil conditions and negotiating steep field inclines.`,
        model3d: {
          title: 'Agricultural Rover Full Assembly',
          url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        models3d: [
          {
            title: 'Agricultural Rover Full Assembly',
            url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
            type: 'sketchfab',
          },
          {
            title: 'Agricultural Rover Chassis',
            url: 'https://sketchfab.com/models/f9d694f2260c42a490f925d8bae35d0e/embed?autospin=1&autostart=1',
            type: 'sketchfab',
          },
        ],
        videoUrl: 'https://www.youtube.com/embed/2D0GofY40FA',
        galleryImages: [
          '/static/rower/3dModel.jpeg',
          '/static/rower/IMG_20241119_221533.jpg',
          '/static/rower/car_3d.gif',
        ],
        specs: [
          { label: 'Application', value: 'Agricultural Towing & Field Inspection' },
          { label: 'CAD Software', value: 'SolidWorks Parametric Assembly' },
          { label: 'Engineering Calculations', value: 'Drawbar Pull, Incline Gradeability & FEA' },
          { label: '3D Models Included', value: 'Full Rover Assembly & Bare Chassis' },
        ],
      },
      {
        id: 'smart-watch',
        title: '2. Smart Health Tracking Watch (ESP32-S3 Wearable)',
        shortDescription: 'Wearable smart health tracking watch enclosure with snap-fit joints housing ESP32-S3, MAX30102, and MPU6050 sensors.',
        description: `Currently developing a wearable smart health tracking watch utilizing the **ESP32-S3**. Features MAX30102 heart rate / SpO2 sensor, MPU6050 accelerometer, TP4056 rechargeable battery circuit, and snap-fit PLA+ enclosure.`,
        model3d: {
          title: 'Smart Health Watch CAD (watch_2)',
          url: 'https://sketchfab.com/models/462b5d8ede60480c998d240b1384288c/embed?autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://www.youtube.com/embed/O3_xjl86TO4',
        galleryImages: [
          '/static/watch/watch.jpeg',
          '/static/watch/watch.png',
          '/static/watch/watch_explore.jpeg',
          '/static/GPT.jpg',
        ],
        specs: [
          { label: 'Processor', value: 'ESP32-S3 Mini Module' },
          { label: 'Sensors Integrated', value: 'MAX30102 (SpO2/HR) & MPU6050' },
          { label: 'Power Architecture', value: 'TP4056 USB-C Rechargeable' },
          { label: 'Manufacturing', value: '3D Printed PLA+ Snap-Fit Joint Enclosure' },
        ],
      },
      {
        id: '3-jaw-chuck',
        title: '3. Lathe 3-Jaw Chuck for Laser Engraving Machine',
        shortDescription: 'Custom 3D-printed 3-jaw self-centering chuck enabling cylindrical ring engraving on a CNC laser engraver, saving ₹2,000–₹3,000 in tooling costs.',
        description: `Engineered an upgrade for a CNC laser engraving machine to engrave names and logos onto cylindrical finger rings using a custom scroll-plate 3-jaw chuck designed in Fusion 360.`,
        videoUrl: 'https://www.youtube.com/embed/S4zS77OUl8o',
        galleryImages: [
          '/static/3d_printing/IMG_3563.JPG',
          '/static/3d_printing/IMG_3625.JPG',
        ],
        specs: [
          { label: 'Commercial Savings', value: 'Saved ₹2,000 – ₹3,000 in hardware tooling' },
          { label: 'Mechanism Type', value: 'Scroll Plate 3-Jaw Self-Centering Chuck' },
          { label: 'Print Material', value: 'High Infill Rigid PLA' },
          { label: 'Application', value: 'Rotary Axis Cylindrical Ring Engraving' },
        ],
      },
      {
        id: 'rotating-display-bed',
        title: '4. Rotating Bed for Model Display & Video Capture',
        shortDescription: 'Concentric 360-degree rotating turntable bed designed in Fusion 360 for dynamic CAD model inspection and video recording.',
        description: `Created a smooth concentric 360-degree rotating display bed to present 3D CAD prototypes dynamically during high-resolution video recordings.`,
        model3d: {
          title: '3D Printed Rotating Display Bed',
          url: 'https://sketchfab.com/models/f9a45683183e4bc3a382eedf9c332771/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://youtube.com/embed/-SqQ3uOOTR8',
        galleryImages: [
          '/static/3d_printing/IMG_3564.JPG',
          '/static/3d_printing/IMG_3626.JPG',
        ],
        specs: [
          { label: 'Rotation Span', value: '360° Continuous Smooth Rotation' },
          { label: 'CAD Tool', value: 'Autodesk Fusion 360' },
          { label: 'Function', value: 'Cinematic Hardware Review & Presentation' },
        ],
      },
      {
        id: 'cnc-z-axis',
        title: '5. CNC Laser Engraver Z-Axis Upgrade for Wood Carving',
        shortDescription: 'Rigid Z-axis gantry carriage upgrade designed in Fusion 360 accommodating a high-RPM spindle motor for 1mm per pass depth milling.',
        description: `Upgraded the functionality of a 2-axis desktop CNC laser machine to perform precision wood carving and milling with a controlled depth of 1mm per pass in hardwoods and soft aluminum.`,
        model3d: {
          title: 'CNC Z-Axis Upgrade Assembly',
          url: 'https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://youtube.com/embed/zGyGgTdxowI',
        galleryImages: [
          '/static/leaser_cnc/laser.png',
          '/static/leaser_cnc/IMG_3565.JPG',
          '/static/leaser_cnc/IMG_3566.JPG',
          '/static/leaser_cnc/IMG_3582.JPG',
        ],
        heroImage: '/static/leaser_cnc/IMG_3565.JPG',
        tools: ['Fusion 360', 'SolidWorks', '3D Printing', 'GRBL Firmware', 'Lead Screw Kinematics'],
        specs: [
          { label: 'Z-Travel Stroke', value: '65 mm Linear Travel' },
          { label: 'Milling Depth', value: '1 mm per pass controlled depth' },
          { label: 'Lead Screw', value: 'T8 Pitch 2mm Lead 8mm' },
          { label: 'Guide System', value: 'Dual 8mm Hardened Chrome Rods' },
          { label: 'Compatibility', value: 'Laser Module & 775 DC Spindle Motor' },
        ],
      },
      {
        id: 'custom-stepper-motors',
        title: '6. Custom Stepper Motor Housings (3 Variations)',
        shortDescription: 'Suite of custom 3D CAD stepper motor models including Stepper Motor v7, Cylindrical v1, and NEMA 21.',
        description: `Modeled and verified 3 bespoke **stepper motor actuator enclosures and motor geometry assemblies** in SolidWorks and Fusion 360 for robotic manipulator joints.`,
        model3d: {
          title: 'Stepper Motor v7 (Robotic Joint)',
          url: 'https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        models3d: [
          {
            title: 'Stepper Motor v7 (Robotic Joint)',
            url: 'https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1',
            type: 'sketchfab',
          },
          {
            title: 'Cylindrical Stepper Motor v1',
            url: 'https://sketchfab.com/models/bc19dc85c3f74694924033dab609fb1a/embed?autospin=1&autostart=1',
            type: 'sketchfab',
          },
          {
            title: 'NEMA 21 Stepper Motor v1',
            url: 'https://sketchfab.com/models/61e9fc0271ed49e6af784659e9026f69/embed?autospin=1&autostart=1',
            type: 'sketchfab',
          },
        ],
        galleryImages: [
          '/static/3d_printing/IMG_3625.JPG',
          '/static/3d_printing/IMG_3626.JPG',
        ],
        heroImage: '/static/3d_printing/IMG_3625.JPG',
        tools: ['SolidWorks', 'Fusion 360', 'Parametric Modeling', '3D Printing'],
        specs: [
          { label: 'Models Included', value: 'v7, Cylindrical v1, NEMA 21' },
          { label: 'Interactive CAD', value: '3 Sketchfab 3D Models' },
          { label: 'Shaft Standard', value: '5 mm D-Cut Precision Steel Shaft' },
          { label: 'Application', value: 'Robotic Manipulator Joint Packaging' },
        ],
      },
    ],
    specs: [
      { label: 'Total Sub-Projects', value: '6 Functional Prototyping Projects' },
      { label: 'Interactive 3D Models', value: '8 Sketchfab CAD Models' },
      { label: 'CAD Software', value: 'SolidWorks 2024 / Fusion 360' },
      { label: 'Manufacturing Process', value: 'FDM & SLS 3D Printing' },
      { label: 'Materials Tested', value: 'PLA+, PETG, ABS' },
    ],
    featured: true,
    date: '2024',
    order: 1,
  },
  {
    id: 'ev-conversion-maruti-800',
    slug: 'ev-conversion-maruti-800',
    title: 'Electric Vehicle Conversion - Maruti 800',
    shortDescription: 'Complete electric vehicle retrofit of a Maruti 800 petrol car, leading an 18-member engineering team to design custom gearbox mounts, ANSYS FEA simulations, and electric powertrain integration.',
    fullDescription: `### Electric Vehicle Conversion - Maruti 800 (Feb – May 2024)

This final year mechanical engineering project involved the complete conversion of a **Maruti 800 petrol car into a fully functional electric vehicle**. Driven by a commitment to promote sustainable transportation and gain practical experience in electric vehicle technology, our team undertook this challenging yet rewarding endeavor.

The conversion process encompassed the removal of the internal combustion engine and related components, followed by the design and integration of a suitable electric motor, battery pack, motor controller, and other necessary electrical systems. The successful completion of this project not only resulted in a working EV but also earned **university recognition and newspaper awards** for its innovation and technical execution.

#### Key Contributions & Engineering Tasks:
- **Team Leadership & Project Management**: As the team leader for this project involving **18 engineering members**, I took the initiative in defining project objectives, delegating tasks based on individual skills, and ensuring effective communication and collaboration throughout the project lifecycle. Instrumental in successfully meeting project milestones and achieving our final road-tested goal.
- **Design and Development of the Gearbox Mount**: Identified the critical challenge of connecting the electric motor to the existing transaxle/gearbox. Spearheaded the design and development of a custom "Gearbox Mount" component using **Autodesk Fusion 360**. The component was designed with simplicity and ease of manufacturing in mind, as no suitable off-the-shelf solution existed. The design focused on effectively transmitting power from the motor shaft to the transmission shaft while ensuring structural integrity.
- **Structural FEA Analysis of the Gearbox Mount**: Conducted comprehensive structural analysis of the designed Gearbox Mount using **ANSYS**. The simulations validated the component's durability and safety under operational torque loads:
  - **Max Deformation**: 0.01 mm
  - **Max Shear Stress**: 6.5 MPa
  - Both metrics well within acceptable safety limits, ensuring reliable power transmission.
- **Component Integration**: Spearheaded the physical integration of the 1 kW 49V BLDC electric motor, custom battery pack, and motor controller into the Maruti 800 engine bay and chassis.
- **Road Testing & Validation**: Executed comprehensive road testing and performance verification, demonstrating smooth acceleration, efficient power transmission, and reliable operation.

#### Technical Details of the Gearbox Mount:
- **Material Selection**: Mild steel chosen for optimal mechanical properties, local availability, machinability, and cost-effectiveness.
- **Design Simplicity**: Prioritized simple geometric shapes and standard manufacturing operations to ensure feasibility with available machine shop resources.
- **Power Transmission Efficiency**: Direct coupling between the electric motor shaft and the gearbox input shaft minimizing mechanical losses.
- **Structural Integrity**: Validated under peak starting torque in ANSYS FEA.`,
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
    shortDescription: 'Custom-built CNC laser engraving and cutting machine using Arduino Uno, GRBL firmware, NEMA17 steppers, and salvaged TVS matrix printer linear axes with 23×30 cm work area.',
    fullDescription: `### Wood Laser Engraving Machine & Arduino CNC Laser Cutter

Built an affordable desktop CNC laser engraving machine during college to cut costs and support practical needs. It is capable of engraving intricate logos and vector images on wood and cardboard, and cleanly cutting through 2–3 mm softwood with high precision.

#### Hardware & Mechanical Design:
- **Linear Axes Salvaged from TVS Matrix Printers**: Repurposed precision linear axes from old TVS matrix printers, saving ₹5000–₹6000 per axis while maintaining smooth linear guidance.
- **Wooden Bed Calibration**: The wooden bed was leveled using a precision spirit level and calibrated with vernier calipers for accurate focal depth.
- **Drive System**: Timing belt drive system with NEMA17 stepper motors driven by TB6600 microstepping drivers for smooth, repeatable motion at 5 cm/second.
- **Laser Optics**: 0.5W 445–450 nm Blue Laser Module (210mA) with adjustable focal lens.

#### Software & Control Workflow:
1. **Design to Vector**: Created artwork, logos, and vector paths in **Inkscape**.
2. **G-Code Generation**: Converted vector paths to machine G-code using Inkscape's G-code extension.
3. **Machine Control**: Loaded G-code into **OpenBuilds Control** over USB.
4. **Firmware Execution**: **Arduino Uno** running **OpenBuilds GRBL** firmware interprets coordinate moves and controls laser PWM.

#### Real-World Research & Business Value:
Conducted local market research before starting the build. While local commercial shops charged ₹2,500–₹3,000 for a 10×15 cm engraving, we offered the exact same quality for ₹1,500 with student discounts (₹800–₹1,000), successfully generating income while mastering mechatronics.

#### Performance & Results:
- Clean cuts through 2–3 mm softwood.
- Sharp high-contrast logo engraving on hardwoods, plywood, and cardboard.
- Fine-tuned laser feedrate and PWM power levels for distortion-free engraving.`,
    category: 'Engineering Projects',
    heroImage: '/static/laser.png',
    galleryImages: [
      '/static/laser.png',
      '/static/leaser_cnc/IMG_3565.JPG',
      '/static/leaser_cnc/IMG_3566.JPG',
      '/static/leaser_cnc/IMG_3582.JPG',
    ],
    videoUrl: 'https://www.youtube.com/embed/feYczSyh0Ps',
    tools: ['Arduino Uno', 'GRBL Firmware', 'OpenBuilds Control', 'Inkscape (G-Code)', 'TB6600 Drivers', 'NEMA17 Steppers'],
    specs: [
      { label: 'Laser Module', value: '0.5W Blue Laser (445–450 nm, 210mA)' },
      { label: 'Stepper Motors', value: 'NEMA17 High Torque' },
      { label: 'Motor Drivers', value: 'TB6600 Microstepping' },
      { label: 'Controller Board', value: 'Arduino Uno running GRBL' },
      { label: 'Work Area', value: '23 × 30 cm' },
      { label: 'Working Speed', value: '5 cm / second' },
      { label: 'Frame & Motion', value: 'TVS Matrix Linear Axes + Belt Drive' },
      { label: 'Cutting Capacity', value: '2–3 mm Softwood / Cardboard' },
    ],
    featured: true,
    date: '2023',
    order: 3,
  },
  {
    id: 'bom-automation',
    slug: 'bom-automation',
    title: 'Automating Project Tracking with Google Sheets using Python',
    shortDescription: 'Automated master Bill of Materials (BOM) tracker in Python monitoring 3000+ client part numbers across local directory trees, automatically syncing creation status, file paths, and dates to Google Sheets via API.',
    fullDescription: `### Automating Project Tracking with Google Sheets using Python

Built to solve a critical engineering tracking bottleneck in monitoring the creation status of **more than 3,000 part numbers** listed in a client-provided Master BOM.

Parts were being designed and saved locally as SolidWorks assembly (\`.SLDASM\`) or neutral CAD (\`.STEP\`) files across dozens of subdirectories, making manual progress tracking error-prone and labor-intensive.

#### Architecture & Automated Workflow:
- **Local File System Scanner**: Developed a robust Python script that recursively traverses local directory trees to identify newly modeled \`.SLDASM\` and \`.STEP\` files.
- **BOM Cross-Verification**: The script reads the part numbers from Column A of a cloud-hosted Google Sheet Master BOM and checks if corresponding assembly or part files have been generated.
- **Google Sheets API v4 Sync**: Directly updates Column B with real-time status ("Created" / "Not Created"), records exact local file paths, detects the file format, and stamps the discovery timestamp.
- **Interactive Command Prompt**: Designed an interactive runtime prompt allowing project managers to input any target source path or project directory dynamically.

#### Engineering Impact:
- **Zero Manual Overhead**: Eliminated manual verification across 3,000+ part numbers, saving dozens of engineering hours each week.
- **Instant Client Visibility**: Provided engineering management and clients with real-time progress transparency via the synchronized Google Spreadsheet.
- **High Reliability**: Implemented robust exception handling for network retries and automated OAuth token refreshment.`,
    category: 'Engineering Projects',
    heroImage: '/static/bom.png',
    galleryImages: [
      '/static/bom.png',
    ],
    videoUrl: 'https://www.youtube.com/embed/zRhuhkMxTAc?si=9mRyQHGl9457Ruwi',
    tools: ['Python', 'Google Sheets API', 'Google Apps Script', 'SolidWorks BOM', 'Data Automation', 'File System API'],
    specs: [
      { label: 'Part Tracking Volume', value: '3,000+ Master BOM Parts' },
      { label: 'Formats Monitored', value: 'SolidWorks (.SLDASM) & STEP (.STEP)' },
      { label: 'Integration', value: 'Google Sheets API v4 / OAuth 2.0' },
      { label: 'Output Columns', value: 'Status, File Path, Extension, Date Found' },
      { label: 'Scanning Speed', value: 'Automated background scans in seconds' },
    ],
    featured: true,
    date: '2024',
    order: 4,
  },
  {
    id: '6-axis-robotic-arm',
    slug: '6-axis-robotic-arm',
    title: '6-Axis Robotic Arm Development',
    shortDescription: 'Modular 6-DOF robotic manipulator modeled in Fusion 360, fabricated with 3D-printed PLA, stepper motors, TB6600 drivers, encoder feedback, and ANSYS structural simulation.',
    fullDescription: `### 6-Axis Robotic Arm Development

An advanced robotics and mechatronics project developing a modular **6-axis articulated robotic arm** to integrate mechanical CAD design, embedded microcontrollers, closed-loop sensor feedback, and structural FEA analysis.

#### Key Engineering Contributions & Subsystems:
- **Structural Design & Modularity**: Modeled the entire 6-DOF arm structure and articulated linkages in **Autodesk Fusion 360** with a focus on joint flexibility, weight distribution, and 3D printing feasibility.
- **3D Printed Fabrication (PLA)**: Fabricated lightweight, high-rigidity structural segments using FDM 3D printing in PLA, maintaining close dimensional tolerances for bearing presses and pivot alignment.
- **Actuators & Drive Electronics**: Selected high-torque NEMA stepper motors paired with TB6600 microstepping drivers to supply necessary holding torque and smooth angular velocity per joint.
- **Firmware & Motion Control**: Programmed coordinate translation and motion planning algorithms in **C** for microcontroller execution.
- **Sensor Feedback Integration**: Integrated rotary encoders, end-stop microswitches, and limit sensors for homing routines and real-time positional verification.
- **ANSYS Structural FEA**: Evaluated von Mises stress concentrations, joint deflection, and strain under dynamic payload configurations in ANSYS to reinforce critical load-bearing linkages.`,
    category: 'Engineering Projects',
    heroImage: '/static/arm.jpg',
    galleryImages: [
      '/static/arm.jpg',
    ],
    tools: ['Fusion 360', 'C Programming', 'Arduino / Microcontroller', 'Stepper Motor Control', '3D Printing (PLA)', 'ANSYS FEA', 'Sensors & Feedback'],
    specs: [
      { label: 'Kinematics', value: '6 Degrees of Freedom (6-DOF)' },
      { label: 'Structural Material', value: '3D-Printed PLA Structure' },
      { label: 'Actuators', value: 'High-Torque Stepper Motors' },
      { label: 'Motor Drivers', value: 'TB6600 Microstepping' },
      { label: 'Simulation Software', value: 'ANSYS Static & Dynamic FEA' },
      { label: 'Feedback Sensors', value: 'Rotary Encoders & End-Stop Switches' },
    ],
    featured: false,
    date: '2024',
    order: 5,
  },
  {
    id: 'advanced-thread-wizard',
    slug: 'advanced-thread-wizard',
    title: 'SolidWorks Automation — Thread Wizard Add-in & Configuration Macros',
    shortDescription: 'Custom SolidWorks Add-in and batch configuration VBA macros engineered with the SolidWorks API in C# / VB.NET / VBA, reducing thread generation and batch configuration workflows by over 75%.',
    fullDescription: `### SolidWorks Automation — Thread Wizard Add-in & Configuration Macros

Developed a suite of custom SolidWorks automation tools and macros engineered using the **SolidWorks API** in **C# / VB.NET / VBA** to eliminate repetitive design bottlenecks and accelerate CAD production workflows.

#### 1. Advanced Thread Wizard Add-in:
- **Massive Time Reduction**: Cut thread generation and specification time from **15–20 minutes** (manual standard lookup, profile sketch, and sweep cut/boss) down to **20–40 seconds**.
- **Standardized Profile Library**: Integrated international thread profiles compliant with **ISO and ASME** standards:
  - UN, UNJ, and UNR series (including Fine, Extra-Fine, and Special series)
  - Parallel and Taper pipe threads (NPT, BSPP, BSPT)
  - Metric Trapezoidal and ACME threads
- **Parametric Feature Automation**: Fully automated parametric sketch and helical sweep creation, eliminating manual sketching errors and ensuring exact pitch diameters and dimensional tolerances.
- **Embedded CAD GUI**: Designed an intuitive WPF user interface directly docked inside SolidWorks for instant profile selection, real-time pitch calculation, and live 3D preview.

#### 2. Configuration & Batch Assembly Macros:
- **Macro for Open Assemblies**: Prompts the user for a destination directory and automatically exports every configuration within an open \`.SLDASM\` assembly as an individual, cleanly named \`.SLDPRT\` part file.
- **High-Volume Batch Conversion Macro**: Traverses a source directory containing 80–100+ configurable assemblies, opens each assembly headless, extracts all configured parts, and saves them into dedicated folders matching each assembly's nomenclature.
- **Time Savings**: Reduced full-day file preparation tasks from **~8 hours down to 1.5–2 hours**, currently deployed and utilized across the engineering design team.`,
    category: 'Engineering Projects',
    heroImage: '/static/macro.png',
    galleryImages: [
      '/static/macro.png',
      '/static/GPT.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/bX4SZfrD5_c?si=janjobJoquCv1-Fs',
    tools: ['SolidWorks API', 'C# / .NET', 'VBA Macros', 'ASME & ISO Standards', 'Automation Scripting'],
    specs: [
      { label: 'Time Efficiency', value: '15-20 min down to 20-40 sec' },
      { label: 'Batch Processing', value: '80–100+ assemblies per automated batch' },
      { label: 'Supported Standards', value: 'ISO Metric, ASME UN/UNJ/UNR, Pipe, Trapezoidal' },
      { label: 'Integration', value: 'Native SolidWorks Add-in (.dll) & VBA Macros' },
      { label: 'Development Language', value: 'C#, VB.NET, VBA' },
      { label: 'Tolerance Control', value: 'Precise Pitch & Root Radii Automation' },
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

#### Project Milestones & Functionality:
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
