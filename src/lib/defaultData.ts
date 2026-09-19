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
    id: 'advanced-thread-wizard',
    slug: 'advanced-thread-wizard',
    title: 'Advanced Thread Wizard – SolidWorks Add-in',
    shortDescription: 'Custom SolidWorks add-in generating standard and custom threads directly inside CAD, slashing thread creation from 15–20 minutes to 20–40 seconds.',
    fullDescription: `### Advanced Thread Wizard for SolidWorks

Developed a custom SolidWorks Add-in engineered using the **SolidWorks API** in **C# / VB.NET / VBA** to automate standard and custom thread generation directly inside the CAD design environment.

#### Key Engineering & Software Highlights:
- **Massive Time Reduction**: Cut thread generation and specification time from **15–20 minutes** (manual standard lookup, profile sketch, and sweep cut/boss) down to **20–40 seconds**.
- **Standardized Profile Library**: Integrated international thread profiles compliant with **ISO and ASME** standards:
  - UN, UNJ, and UNR series (including Fine, Extra-Fine, and Special series)
  - Parallel and Taper pipe threads (NPT, BSPP, BSPT)
  - Metric Trapezoidal and ACME threads
- **Parametric Feature Automation**: Fully automated parametric sketch and helical sweep creation, eliminating manual sketching errors and ensuring exact pitch diameters and dimensional tolerances.
- **Embedded CAD GUI**: Designed an intuitive WPF/Windows Forms user interface directly docked inside SolidWorks for instant profile selection, real-time pitch calculation, and live 3D preview.`,
    category: 'Engineering Tools',
    heroImage: '/static/macro.png',
    galleryImages: [
      '/static/macro.png',
      '/static/3dModel.jpeg',
      '/static/GPT.jpg',
    ],
    tools: ['SolidWorks API', 'C# / .NET', 'VB.NET / VBA', 'ASME Standards', 'ISO Standards'],
    specs: [
      { label: 'Time Efficiency', value: '15-20 min down to 20-40 sec' },
      { label: 'Supported Standards', value: 'ISO Metric, ASME UN/UNJ/UNR, Pipe, Trapezoidal' },
      { label: 'Integration', value: 'Native SolidWorks Add-in (.dll)' },
      { label: 'Development Language', value: 'C#, VB.NET, VBA' },
      { label: 'Tolerance Control', value: 'Precise Pitch & Root Radii Automation' },
    ],
    featured: true,
    date: '2024',
    order: 1,
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
    category: 'Engineering Tools',
    heroImage: '/static/bom.png',
    galleryImages: [
      '/static/bom.png',
      '/static/TKAP1058.JPG',
      '/static/TBNL9271.JPG',
    ],
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
    order: 2,
  },
  {
    id: '3d-printing-modeling',
    slug: '3d-printing-modeling',
    title: '3D Modeling & Additive Prototyping Projects',
    shortDescription: 'Collection of 6 functional mechanical 3D modeling and additive prototyping projects. Use the interactive project switcher arrows to explore each sub-project with its 3D model, photos, and video demos.',
    fullDescription: `A comprehensive portfolio of 6 physical hardware prototyping projects spanning wearable IoT enclosures, autonomous agricultural rovers, custom lathe fixtures, motorized display turntables, CNC carving units, and robotic actuator housings.`,
    category: '3D CAD & Printing',
    heroImage: '/static/3dModel.jpeg',
    galleryImages: [
      '/static/3dModel.jpeg',
      '/static/watch.jpeg',
      '/static/watch_explore.jpeg',
      '/static/GPT.jpg',
      '/static/IMG_3625.JPG',
      '/static/IMG_3564.JPG',
      '/static/IMG_3563.JPG',
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

The team required a dedicated chassis capable of:
- Specific dimensional constraints (track width, wheelbase, and crop row clearance)
- Pulling high drawbar payload loads across irregular soil conditions
- Negotiating steep field inclines and terrain angles

Performed comprehensive mechanical calculations to determine tractive effort, gear reduction ratios, structural beam sizing, and center of gravity placement. Modeled the full assembly and independent chassis in SolidWorks to ensure high strength-to-weight ratio and ease of fabrication.`,
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
          '/static/3dModel.jpeg',
          '/static/IMG_3564.JPG',
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
        description: `Currently developing a wearable smart health tracking watch utilizing the **ESP32-S3**. 

The mechanical design and hardware connections have been completed, cleanly integrating:
- **MAX30102**: Heart rate and blood oxygen (SpO₂) optical monitoring sensor
- **MPU6050**: 6-axis motion and activity accelerometer/gyroscope
- **TP4056 & LiPo Battery**: Rechargeable lithium polymer power management circuit
- **Haptic Vibration Motor**: Tactile user notification feedback

At present, working on embedded firmware and development of a customized mobile application for real-time telemetry and health monitoring. Demonstrates expertise in wearable hardware packaging, sensor integration, and ergonomic snap-fit CAD design.`,
        model3d: {
          title: 'Smart Health Watch CAD (watch_2)',
          url: 'https://sketchfab.com/models/462b5d8ede60480c998d240b1384288c/embed?autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://www.youtube.com/embed/O3_xjl86TO4',
        galleryImages: [
          '/static/watch.jpeg',
          '/static/watch_explore.jpeg',
          '/static/IMG_3625.JPG',
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
        description: `Engineered an upgrade for a CNC laser engraving machine to engrave names and logos onto cylindrical finger rings.

This required a rotary bed to securely center the ring and rotate it precisely along the X-axis during the vector burning process. Commercially available small chucks were priced between ₹2,000 to ₹3,000. 

To overcome this, designed and 3D printed a custom 3-jaw self-centering scroll chuck in **Autodesk Fusion 360**. Sliced with high infill density using PLA for dimensional rigidity and wear resistance. Verified concentricity and holding force, successfully achieving clean 360° ring engravings.`,
        videoUrl: 'https://www.youtube.com/embed/S4zS77OUl8o',
        galleryImages: [
          '/static/3dModel.jpeg',
          '/static/IMG_3563.JPG',
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
        description: `Created a smooth concentric 360-degree rotating display bed to present 3D CAD prototypes dynamically during high-resolution video recordings.

Designed in **Fusion 360** with focus on low rotational friction, smooth bearing alignment, and compact print volume. Sliced and printed in PLA, providing a stable motorized platform for cinematic product reveals.`,
        model3d: {
          title: '3D Printed Rotating Display Bed',
          url: 'https://sketchfab.com/models/f9a45683183e4bc3a382eedf9c332771/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://youtube.com/embed/-SqQ3uOOTR8',
        galleryImages: [
          '/static/IMG_3626.JPG',
          '/static/IMG_3564.JPG',
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
        description: `Upgraded the functionality of a 2-axis desktop CNC laser machine to perform precision wood carving and milling with a controlled depth of 1mm per pass in hardwoods and soft aluminum.

Designed a new rigid Z-axis carriage in **Fusion 360** engineered to support a spindle motor, lead screw drive, and anti-backlash nut assembly while preserving X-axis gantry balance.`,
        model3d: {
          title: 'CNC Z-Axis Upgrade Assembly',
          url: 'https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://youtube.com/embed/zGyGgTdxowI',
        galleryImages: [
          '/static/laser.png',
          '/static/IMG_3565.JPG',
          '/static/IMG_3566.JPG',
          '/static/IMG_3582.JPG',
        ],
        specs: [
          { label: 'Milling Depth', value: '1 mm per pass controlled depth' },
          { label: 'Drive Mechanism', value: 'Precision Lead Screw with Anti-Backlash Nut' },
          { label: 'Structural Carriage', value: 'Reinforced 3D Printed Spindle Mount' },
        ],
      },
      {
        id: 'stepper-motors',
        title: '6. Custom Stepper Motors for 6-Axis Robotic Arm',
        shortDescription: 'Tailored stepper motor actuator housings (Stepper Motor v7, Cylindrical v1, NEMA 21) designed in SolidWorks for robotic joint alignment.',
        description: `During the design of the 6-axis articulated robotic arm, off-the-shelf stepper motors failed to match tight joint envelope constraints and mounting bolt alignments.

Designed custom stepper motor outer housings and mounting flanges in **SolidWorks**. Tailored the bolt circle diameters, shaft clearances, and bearing pockets to interface seamlessly with planetary and cycloidal joint reducers. Includes 3 interactive 3D models on Sketchfab.`,
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
        videoUrl: 'https://youtube.com/embed/3BYo8GMtsGc',
        galleryImages: [
          '/static/arm.jpg',
          '/static/IWDY3040.JPG',
          '/static/IMG_2590.JPG',
        ],
        specs: [
          { label: '3D Models Included', value: 'Stepper Motor v7, Cylindrical v1, NEMA 21' },
          { label: 'CAD Tool', value: 'SolidWorks 2024' },
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
    order: 3,
  },
  {
    id: 'cnc-laser-cutter',
    slug: 'cnc-laser-cutter',
    title: 'Arduino-Based CNC Laser Cutting & Z-Axis Milling',
    shortDescription: 'Engineered a 2-axis CNC laser cutter and custom Z-axis assembly with interactive 3D model on Sketchfab for wood carving and depth milling.',
    fullDescription: `### Arduino-Based CNC Laser Cutting Machine & Z-Axis Upgrade

Designed and built an automated desktop CNC laser engraver and upgraded Z-axis milling unit for precision laser cutting and controlled depth wood carving.

#### Interactive 3D CAD:
- Features an interactive 3D model of the custom CNC assembly on Sketchfab.
- **Gantry Kinematics**: CoreXY dual-axis belt drive mechanism utilizing V-slot aluminum extrusions.
- **Z-Axis Upgrade Assembly**: Designed a custom rigid Z-axis gantry in Fusion 360 accommodating a spindle motor for 1mm per pass depth milling in wood and soft materials.
- **Laser Optics**: Equipped with a 5.5W 450nm optical laser module with PWM duty-cycle intensity control.`,
    category: 'Robotics & Automation',
    heroImage: '/static/laser.png',
    galleryImages: [
      '/static/laser.png',
      '/static/IMG_3565.JPG',
      '/static/IMG_3566.JPG',
      '/static/IMG_3582.JPG',
    ],
    tools: ['SolidWorks', 'Fusion 360', 'Arduino', 'GRBL', 'CNC Machining', 'LaserGRBL', '3D Printing'],
    model3d: {
      type: 'sketchfab',
      url: 'https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1',
      title: 'CNC Laser Z-Axis Upgrade Assembly',
    },
    models3d: [
      {
        title: 'CNC Laser Z-Axis Upgrade Assembly',
        url: 'https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1',
        type: 'sketchfab',
      },
    ],
    videoUrl: 'https://youtube.com/embed/zGyGgTdxowI',
    specs: [
      { label: 'Interactive 3D Model', value: 'Sketchfab Interactive View' },
      { label: 'Work Area', value: '400mm x 400mm' },
      { label: 'Laser Module', value: '5.5W 450nm Focusable Blue Laser' },
      { label: 'Controller', value: 'Arduino Nano with CNC Shield' },
      { label: 'Z-Axis Travel', value: 'Custom Spindle Carriage for Milling' },
    ],
    featured: true,
    date: '2023',
    order: 4,
  },
  {
    id: '6-axis-robotic-arm',
    slug: '6-axis-robotic-arm',
    title: '6-Axis Robotic Arm & Custom Stepper Motors',
    shortDescription: 'Kinematics modeling and custom 3D-modeled stepper motor housings (Stepper Motor v7, Cylindrical v1, NEMA 21) with 3 interactive Sketchfab 3D models.',
    fullDescription: `### 6-Axis Robotic Arm & Custom Stepper Motor Actuators

Designed a 6-Degrees-of-Freedom articulated robotic arm optimized for pick-and-place automation and experimental payload handling, including custom-designed stepper motor mounting enclosures.

#### 3 Interactive 3D Models on Sketchfab:
1. **Stepper Motor v7**: Custom joint actuator housing with tailored bolt circle and mounting flange tolerances.
2. **Cylindrical Stepper Motor v1**: Ergonomic compact cylindrical joint motor assembly.
3. **NEMA 21 Stepper Motor v1**: High-torque mounting bracket and faceplate design.

#### Kinematics & Reducers:
- Modeled link lengths and joint clearances in Fusion 360 and SolidWorks with inverse kinematics calculations simulated in Python.
- Integrated cycloidal and planetary reduction gearsets to maximize torque output and eliminate joint backlash.`,
    category: 'Robotics & Automation',
    heroImage: '/static/arm.jpg',
    galleryImages: [
      '/static/arm.jpg',
      '/static/IWDY3040.JPG',
      '/static/IMG_2590.JPG',
    ],
    tools: ['SolidWorks', 'Fusion 360', 'Python Kinematics', 'Microcontrollers', 'Robotics', 'Stepper Motors'],
    model3d: {
      type: 'sketchfab',
      url: 'https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1',
      title: 'Stepper Motor v7 Joint Actuator',
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
    videoUrl: 'https://youtube.com/embed/3BYo8GMtsGc',
    specs: [
      { label: 'Interactive 3D Models', value: '3 Sketchfab Actuator Models' },
      { label: 'Degrees of Freedom', value: '6 Axis (Rotational)' },
      { label: 'Actuator Types', value: 'Stepper Motor v7, Cylindrical, NEMA 21' },
      { label: 'Control Method', value: 'ESP32 / Inverse Kinematics Python GUI' },
    ],
    featured: true,
    date: '2023',
    order: 5,
  },
  {
    id: 'solidworks-macro-automation',
    slug: 'solidworks-macro-automation',
    title: 'SolidWorks Macro Automation – Configuration & Batch Conversion',
    shortDescription: 'Custom VBA macros for batch processing 80–100+ assemblies, converting configurable assemblies to part files and cutting 8-hour workflows to 1.5–2 hours.',
    fullDescription: `### SolidWorks Parametric & Batch Conversion Macros

Developed custom SolidWorks automation macros (enhanced with ChatGPT prompt engineering) to streamline large-scale assembly configuration and manufacturing release workflows.

#### Engineering Achievements:
- **Configurable Assembly Splitting**: Automated parsing of complex configurable assemblies to extract and save individual part files with custom user-selected destination directories.
- **High-Volume Batch Processing**: Upgraded pipeline to batch-process **80–100+ assemblies in a single run** from a source directory, auto-saving parts while preserving original nomenclature and metadata.
- **75%+ Time Savings**: Reduced full-day engineering file preparation tasks that typically took **~8 working hours down to 1.5–2 hours**.
- **Internal Production Adoption**: Replicated and extended functionality equivalent to SolidWorks Premium tools, currently utilized by the internal engineering design team.`,
    category: 'Software & Scripting',
    heroImage: '/static/macro.png',
    galleryImages: [
      '/static/macro.png',
      '/static/PCFH9191.JPG',
      '/static/MRYC6906.JPG',
    ],
    tools: ['SolidWorks API', 'VBA Macros (VBA)', 'ChatGPT Automation', 'Batch File Processing'],
    specs: [
      { label: 'Batch Capacity', value: '80–100+ assemblies per execution' },
      { label: 'Time Reduction', value: '8 hours down to 1.5–2 hours' },
      { label: 'Language', value: 'SolidWorks VBA / COM API' },
      { label: 'Output', value: 'Individual Parts & Neutral Formats (STEP/DXF)' },
    ],
    featured: false,
    date: '2024',
    order: 6,
  },
  {
    id: 'ev-conversion-maruti-800',
    slug: 'ev-conversion-maruti-800',
    title: 'Electric Vehicle Conversion – Maruti 800',
    shortDescription: 'Led an 18-engineer team retrofitting a Maruti 800 into a functional EV powered by a 1 kW 49V BLDC motor, custom gearbox mount, and ANSYS FEA.',
    fullDescription: `### Electric Vehicle Conversion – Maruti 800 (Feb – May 2024)

Led an engineering team of **18 engineers** in the mechanical and electrical conversion of an ICE Maruti 800 into a fully operational electric vehicle powered by a **1 kW, 49 V Brushless DC (BLDC) motor**.

#### Engineering Deliverables:
- **Custom Gearbox Mount**: Designed, simulated, and precision-manufactured a structural adapter and gearbox mount bridging the electric motor shaft to the existing automotive transaxle, fitted and road-tested successfully.
- **Finite Element Analysis (FEA)**: Conducted static structural and vibrational simulations in **ANSYS** to validate yield strength, safety factors, and fatigue endurance of the motor mounting bracket under peak torque.
- **3D Modeling & Kinematics**: Utilized **Autodesk Fusion 360** for overall powertrain component layout, clearance verification, and assembly packaging.`,
    category: 'EV & Automotive',
    heroImage: '/static/EV_car.JPG',
    galleryImages: [
      '/static/EV_car.JPG',
      '/static/car_3d.gif',
      '/static/IMG_3262.JPG',
      '/static/IMG_3263.JPG',
      '/static/IMG_3265.JPG',
      '/static/IMG_2140.JPG',
    ],
    tools: ['Fusion 360', 'ANSYS Structural', 'BLDC Motor Powertrain', 'Gearbox Mount', 'Fabrication'],
    specs: [
      { label: 'Team Leadership', value: 'Lead Engineer (18 engineers)' },
      { label: 'Powertrain', value: '1 kW, 49 V BLDC Motor' },
      { label: 'CAD Software', value: 'Autodesk Fusion 360' },
      { label: 'Structural Simulation', value: 'ANSYS Mechanical FEA' },
      { label: 'Vehicle Result', value: 'Fully Functional & Road-Tested' },
    ],
    featured: false,
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
