// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  // Vehicle property to accept Car, Truck, and Motorbike objects
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // Constructor to accept Car, Truck, and Motorbike objects
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers: { selectedVehicleVin: string }) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // Choices array for the vehicle options to create
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
        
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        const truck = new Truck(       
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()],
          parseInt(answers.towingCapacity),
        );
        // push the truck to the vehicles array        
        this.vehicles.push(truck);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
          ]
        );
        // push the motorbike to the vehicles array
        this.vehicles.push(motorbike);
        // Tset the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the motorbike
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  // add a parameter to accept a truck object
  findVehicleToTow(truck: Truck): void {
    const towableVehicles = this.vehicles.filter(vehicle => vehicle !== truck);

    if (towableVehicles.length === 0) {
      console.log('No vehicles available to tow.');
      this.performActions();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: towableVehicles.map(vehicle => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle,
          })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = answers.vehicleToTow;
        // check if the selected vehicle is the truck
        // if it is, log that the truck cannot tow itself then perform actions on the truck to allow the user to select another action
        if (vehicleToTow.weight <= truck.towingCapacity) {
          truck.tow(vehicleToTow);
        } else {
        // if it is not, tow the selected vehicle then perform actions on the truck to allow the user to select another action
          console.log(`${vehicleToTow.make} ${vehicleToTow.model} is too heavy to be towed by the truck.`);
        }
        this.performActions();
        
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          //  choices of actions that can be done for the vehicles
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow a vehicle',
            'Do a wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          vehicle => vehicle.vin === this.selectedVehicleVin
        );
        if (!selectedVehicle) {
          console.log('No vehicle selected.');
          this.startCli();
        } else {
          // perform the selected action
          if (answers.action === 'Print details') {
            // find the selected vehicle and print its details
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].printDetails();
              }
            }
          } else if (answers.action === 'Start vehicle') {
            // find the selected vehicle and start it
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].start();
              }
            }
          } else if (answers.action === 'Accelerate 5 MPH') {
            // find the selected vehicle and accelerate it by 5 MPH
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].accelerate(5);
              }
            }
          } else if (answers.action === 'Decelerate 5 MPH') {
            // find the selected vehicle and decelerate it by 5 MPH
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].decelerate(5);
              }
            }
          } else if (answers.action === 'Stop vehicle') {
            // find the selected vehicle and stop it
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].stop();
              }
            }
          } else if (answers.action === 'Turn right') {
            // find the selected vehicle and turn it right
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].turn('right');
              }
            }
          } else if (answers.action === 'Turn left') {
            // find the selected vehicle and turn it left
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].turn('left');
              }
            }
          } else if (answers.action === 'Reverse') {
            // find the selected vehicle and reverse it
            for (let i = 0; i < this.vehicles.length; i++) {
              if (this.vehicles[i].vin === this.selectedVehicleVin) {
                this.vehicles[i].reverse();
              }
            }
          } else if (answers.action === 'Tow a vehicle') {
            // Statements to perform the tow action if the selected vehicle is a truck
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
              return;
            } else {
              console.log('Only trucks can tow.');
            }
            // Statement to perform the wheelie action if the selected vehicle is a motorbike
          } else if (answers.action === 'Do a wheelie') {
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            } else {
              console.log('Only motorbikes can do a wheelie.');
            }
          }
          else if (answers.action === 'Select or create another vehicle') {
            // start the cli to return to the initial prompt if the user wants to select or create another vehicle
            this.startCli();
            return;
          } else {
            // exit the cli if the user selects exit
            this.exit = true;
          }
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
