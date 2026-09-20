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
    fullDescription: `### Project Overview
This section showcases a collection of 3D printing projects I have undertaken to solve practical problems and explore the capabilities of additive manufacturing. These projects range from creating custom accessories for existing machinery to designing components for new systems. The primary motivation behind these projects is to find cost-effective and tailored solutions that meet specific requirements. I have utilized various 3D printers, including FDM (Fused Deposition Modeling) technology, and experimented with different materials like PLA and ABS to achieve the desired functionality and durability. The design process typically involves CAD software such as SolidWorks and Fusion 360, followed by slicing and printing using software like Cura or PrusaSlicer.

### Key Skills & Learnings:
- **Advanced CAD Modeling**: Designing for additive manufacturing, including functional constraints, snap fits, and mechanical linkages.
- **Material Selection**: Understanding the properties of different 3D printing filaments (PLA, ABS, PETG) and selecting the optimal material for thermal and mechanical load conditions.
- **Slicing & Optimization**: Fine-tuning slicing parameters (layer height, infill geometry and density, print speed, nozzle temp) to achieve maximum structural integrity and surface finish.
- **Reverse Engineering**: Custom components designed to seamlessly integrate with existing machines and commercial hardware.
- **Iterative Rapid Prototyping**: Solving mechanical challenges through quick design iterations and functional testing.`,
    category: '3D CAD & Printing',
    heroImage: '/static/3dModel.jpeg',
    galleryImages: [
      '/static/3dModel.jpeg',
      '/static/watch.jpeg',
      '/static/watch_explore.jpeg',
      '/static/IMG_3625.JPG',
      '/static/GPT.jpg',
      '/static/IMG_3564.JPG',
      '/static/IMG_3563.JPG',
      '/static/rower/IMG_20241119_221533.jpg',
    ],
    tools: ['SolidWorks', 'Fusion 360', 'Blender', 'ANSYS FEA', '3D Printing (FDM)', 'Cura', 'PrusaSlicer'],
    model3d: {
      type: 'sketchfab',
      url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
      title: 'Autonomous Agricultural Rover (Rower)',
    },
    subProjects: [
      {
        id: 'smart-watch',
        title: '1. Smart Health Tracking Watch (Ongoing Project)',
        shortDescription: 'Wearable smart health tracking watch using ESP32-S3, MAX30102, and MPU6050 with custom 3D-printed enclosure and mobile app.',
        description: `Currently developing a smart health tracking watch – hardware completed, working on coding and custom mobile app.

This project involves building a wearable smart health tracking watch using the ESP32-S3. The design and hardware connections have been completed, integrating sensors like the MAX30102 (heart rate & SpO₂), MPU6050 (motion/activity), rechargeable battery with TP4056 charging module, and a haptic vibration motor. At present, I am working on the embedded coding and development of a customized mobile application for real-time data monitoring and user interaction. This project demonstrates my skills in hardware design, sensor integration, circuit optimization, and IoT-based health technology development.`,
        model3d: {
          title: 'Smart Health Watch CAD (watch_2)',
          url: 'https://sketchfab.com/models/462b5d8ede60480c998d240b1384288c/embed?autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://www.youtube.com/embed/O3_xjl86TO4?si=ESJH7kZUwNokYcdp',
        galleryImages: [
          '/static/watch.jpeg',
          '/static/watch.png',
          '/static/watch_explore.jpeg',
          '/static/GPT.jpg',
        ],
        heroImage: '/static/watch.jpeg',
        tools: ['ESP32-S3', 'Fusion 360', 'MAX30102', 'MPU6050', '3D Printing (PLA)', 'Embedded C', 'Mobile App'],
        specs: [
          { label: 'Processor', value: 'ESP32-S3 Mini Module' },
          { label: 'Sensors Integrated', value: 'MAX30102 (Heart Rate & SpO₂) and MPU6050 (Motion)' },
          { label: 'Power Architecture', value: 'Rechargeable Battery with TP4056 Module' },
          { label: 'Haptic Feedback', value: 'Miniature Vibration Motor' },
          { label: 'Enclosure Material', value: 'Precision 3D-Printed PLA Snap-Fit Enclosure' },
          { label: 'Application', value: 'Real-time IoT Health Telemetry & Mobile App' },
        ],
      },
      {
        id: 'agricultural-rover',
        title: '2. Agricultural Based Rover',
        shortDescription: 'Specialized agricultural rover (rower) designed with mechanical engineering calculations for high drawbar payload pulling and steep incline climbing.',
        description: `I had the opportunity to work with students from K.I.T.E. Engineering College on an interesting project. They needed a special type of agricultural tool called a rower, which is used for various tasks in farming. The students came to me with specific ideas and needs for this rower. They told me exactly how big it should be (its length and width), how much weight it needed to be able to pull, and even the steepest hills it should be able to climb.

My job was to take all of these requirements and design a rower that could do everything they needed. To do this, I used my knowledge of mechanical engineering and performed several calculations. These calculations helped me figure out the best materials to use, the right sizes for different parts, and how to make sure the rower would be strong enough to handle the loads and climb the inclines.

The goal of my design was to create a rower that was not only functional but also easy to build. By using mechanical calculations, I could ensure that the design would meet all the students' requirements and be safe and efficient for agricultural work. This project involved understanding the students' needs, applying engineering principles, and creating a design that could potentially be manufactured into a real working tool.`,
        model3d: {
          title: 'Agricultural Rover Assembly (Rower)',
          url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        models3d: [
          {
            title: 'Agricultural Rover Assembly (Rower)',
            url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
            type: 'sketchfab',
          },
          {
            title: 'Agricultural Rover Chassis (rower chase)',
            url: 'https://sketchfab.com/models/f9d694f2260c42a490f925d8bae35d0e/embed?autospin=1&autostart=1',
            type: 'sketchfab',
          },
        ],
        videoUrl: 'https://www.youtube.com/embed/2D0GofY40FA?si=uu_nDLT5aZ1KM-MI',
        galleryImages: [
          '/static/3dModel.jpeg',
          '/static/rower/IMG_20241119_221533.jpg',
          '/static/rower/car_3d.gif',
        ],
        heroImage: '/static/3dModel.jpeg',
        tools: ['SolidWorks', 'Mechanical Calculations', 'Gradeability Analysis', 'Chassis Design'],
        specs: [
          { label: 'Client / Collaboration', value: 'K.I.T.E. Engineering College Students' },
          { label: 'Application', value: 'Agricultural Towing & Field Inspection Tool' },
          { label: 'CAD Software', value: 'SolidWorks Parametric Assembly' },
          { label: 'Engineering Calculations', value: 'Drawbar Pull, Incline Gradeability & FEA' },
          { label: 'Interactive 3D Models', value: 'Full Assembly & Bare Chassis on Sketchfab' },
        ],
      },
      {
        id: '3-jaw-chuck',
        title: '3. Lathe 3-Jaw Chuck for Laser Engraving Machine',
        shortDescription: 'Custom 3D-printed 3-jaw self-centering chuck designed in Fusion 360 enabling cylindrical ring engraving on a CNC laser engraver, saving ₹2,000–₹3,000 in tooling costs.',
        description: `The objective of this project was to upgrade my laser engraving machine to enable it to print logos and names on rings. This required a rotating bed to hold the ring securely and rotate it precisely along the X-axis during the engraving process.

Commercially available small chucks suitable for this purpose were priced between ₹2,000 to ₹3,000, which I found to be expensive. To overcome this, I designed and 3D printed my own 3-jaw chuck.

The design was created using Fusion 360, keeping in mind the dimensions required to hold various ring sizes and the mounting mechanism for the laser engraver. The chuck was printed using PLA for its rigidity and ease of printing. After printing, the chuck was tested for its holding capability and rotational accuracy, successfully enabling ring engraving.`,
        videoUrl: 'https://www.youtube.com/embed/S4zS77OUl8o?si=yeXtsQV6hzcDlwuY',
        galleryImages: [
          '/static/3d_printing/IMG_3563.JPG',
          '/static/3d_printing/IMG_3625.JPG',
        ],
        heroImage: '/static/3d_printing/IMG_3563.JPG',
        tools: ['Fusion 360', '3D Printing (PLA)', 'Rotary Axis Kinematics', 'Laser Engraver Upgrades'],
        specs: [
          { label: 'Commercial Savings', value: 'Saved ₹2,000 – ₹3,000 compared to commercial chucks' },
          { label: 'Mechanism Type', value: 'Scroll Plate 3-Jaw Self-Centering Chuck' },
          { label: 'Print Material', value: 'High Infill Rigid PLA' },
          { label: 'Application', value: 'Cylindrical Ring and Curved Object Engraving' },
          { label: 'CAD Tool', value: 'Autodesk Fusion 360' },
        ],
      },
      {
        id: 'rotating-display-bed',
        title: '4. Rotating Bed for Model Display',
        shortDescription: 'Concentric 360-degree rotating turntable bed designed in Fusion 360 for dynamic CAD model inspection and video recording.',
        description: `This project was driven by the need to showcase the 3D models I have designed in a more dynamic way, specifically while recording videos. I wanted a simple yet effective rotating platform that could smoothly turn the models, providing a 360-degree view for better presentation.

I designed a rotating bed with a circular platform using Fusion 360. The design focused on simplicity and ease of printing. It consists of a base and a rotating top, possibly with provisions for a small motor in future iterations for automated rotation. Printed using PLA, this rotating bed has proven useful in creating engaging videos of my 3D printed creations.`,
        model3d: {
          title: '3D Printed Rotating Display Bed (rotating box)',
          url: 'https://sketchfab.com/models/f9a45683183e4bc3a382eedf9c332771/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://youtube.com/embed/-SqQ3uOOTR8',
        galleryImages: [
          '/static/3d_printing/IMG_3564.JPG',
          '/static/3d_printing/IMG_3626.JPG',
        ],
        heroImage: '/static/3d_printing/IMG_3564.JPG',
        tools: ['Fusion 360', '3D Printing (PLA)', 'Mechanism Design', 'Video Showcase'],
        specs: [
          { label: 'Rotation Span', value: '360° Continuous Smooth Dynamic Rotation' },
          { label: 'CAD Tool', value: 'Autodesk Fusion 360' },
          { label: 'Material', value: 'PLA 3D-Printed Bed' },
          { label: 'Function', value: 'Cinematic Hardware Review & 360° Presentation' },
        ],
      },
      {
        id: 'cnc-z-axis',
        title: '5. Upgrading CNC Laser Engraver Z-Axis for Wood Carving',
        shortDescription: 'Rigid Z-axis assembly designed in Fusion 360 to expand desktop CNC laser engraver for wood carving and milling with 1mm depth per pass.',
        description: `My goal with this project was to expand the functionality of my existing CNC laser engraver to include wood carving and milling capabilities, specifically targeting the ability to engrave wood and aluminum with a controlled depth of 1mm per pass.

To achieve this, the primary requirement was an upgrade to the Z-axis of the machine. I designed a new Z-axis assembly using Fusion 360 that could accommodate a spindle motor suitable for milling. The design focused on rigidity and precision to ensure accurate and consistent cutting depth.

Considerations included the mounting mechanism for the spindle, the travel distance of the Z-axis, and the overall stability of the machine. The planned implementation involves using a spindle motor and appropriate end mills to achieve the desired 1mm depth per pass in wood and aluminum.`,
        model3d: {
          title: 'CNC Z-Axis Upgrade Assembly (cnc)',
          url: 'https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        videoUrl: 'https://youtube.com/embed/zGyGgTdxowI',
        galleryImages: [
          '/static/laser.png',
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
          { label: 'Compatibility', value: 'Laser Module & Spindle Motor' },
        ],
      },
      {
        id: 'custom-stepper-motors',
        title: '6. Custom Stepper Motors for 6-Axis Robotic Arm',
        shortDescription: 'Custom stepper motor housings modeled in SolidWorks to ensure precise mounting alignment for robotic arm joints, featuring 3 interactive 3D models.',
        description: `As part of a larger project to design a 6-axis robotic arm, I encountered a challenge related to the fitting of stepper motors at specific joints. The available off-the-shelf stepper motors did not perfectly match the dimensional requirements of the robotic arm design, particularly the alignment of the mounting holes for nuts and bolts.

To address this, I decided to design custom stepper motor housings using SolidWorks. The design process involved carefully measuring the required dimensions and ensuring that the mounting holes would precisely align with the corresponding points on the robotic arm structure.

While the internal components of the stepper motors would likely be standard, the custom-designed housings would guarantee a perfect fit, which is crucial for the structural integrity and functionality of the robotic arm. This project highlights the ability of 3D printing to create custom mechanical components tailored to specific design needs.`,
        model3d: {
          title: 'Stepper Motor v7 (Robotic Joint)',
          url: 'https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1',
          type: 'sketchfab',
        },
        models3d: [
          {
            title: 'Stepper Motor v7',
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
    heroImage: '/static/macro.png',
    galleryImages: [
      '/static/macro.png',
      '/static/GPT.jpg',
    ],
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
