// This chaincode is tested and it works fine

package chaincode

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// Asset describes basic details of what makes up a simple asset
// Insert struct field in alphabetic order => to achieve determinism across languages
// golang keeps the order when marshal to json but doesn't order automatically
// type Asset struct {
// 	AppraisedValue int    `json:"AppraisedValue"`
// 	Color          string `json:"Color"`
// 	ID             string `json:"ID"`
// 	Owner          string `json:"Owner"`
// 	Size           int    `json:"Size"`
// }

type User struct {
	EmailID 		string `json:"email_id"`
	Password 		string `json:"password"`
	Role 			string `json:"role"`
	Currency 		string `json:"currency"`
};

type Contract struct {
	ContractID        string `json:"contract_id"`
	EmployerEmailID   string `json:"employer_id"`
	EmployeeEmailID   string `json:"employee_id"`
	JobTitle          string `json:"job_title"`
	SalaryPerDay      string    `json:"salary"`
	Status            string   `json:"status"`
	StartingDate      string `json:"starting_date"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	
	return nil
}

// CreateUser signs up a new user to the world state with given details.
func (s *SmartContract) CreateUser(ctx contractapi.TransactionContextInterface, email_id string, password string, role string, currency string) error {
	exists, err := s.IsUser(ctx, email_id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the user %s already exists", email_id)
	}

	user := User{
		EmailID:  email_id,
		Password: password,
		Role:     role,
		Currency: currency,
	}
	userJSON, err := json.Marshal(user)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(email_id, userJSON)
}

// CreateUser signs up a new user to the world state with given details.
func (s *SmartContract) CreateContract(ctx contractapi.TransactionContextInterface, employer_id string, employee_id string, job_title string, salary string, status string, starting_date string) error {
	exists, err := s.IsContract(ctx, employer_id+employee_id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the contract %s already exists", employer_id+employee_id)
	}

	contract := Contract{
		ContractID : employer_id + employee_id,
		EmployerEmailID : employer_id,
		EmployeeEmailID : employee_id,
		JobTitle : job_title,
		SalaryPerDay : salary,
		Status : status,
		StartingDate : starting_date,
	}
	contractJSON, err := json.Marshal(contract)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(employer_id+employee_id, contractJSON)
}

// ReadUser returns the asset stored in the world state with given id.
func (s *SmartContract) ReadUser(ctx contractapi.TransactionContextInterface, email_id string) (*User, error) {
	userJSON, err := ctx.GetStub().GetState(email_id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if userJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", email_id)
	}

	user := new(User)
	err = json.Unmarshal(userJSON, user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// ReadContract returns the asset stored in the world state with given id.
func (s *SmartContract) ReadContract(ctx contractapi.TransactionContextInterface, contract_id string) (*Contract, error) {
	contractJSON, err := ctx.GetStub().GetState(contract_id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if contractJSON == nil {
		return nil, fmt.Errorf("the contract %s does not exist", contract_id)
	}

	contract := new(Contract)
	err = json.Unmarshal(contractJSON, &contract)
	if err != nil {
		return nil, err
	}

	return contract, nil
}


// UpdateAsset updates an existing asset in the world state with provided parameters.
// func (s *SmartContract) TransferMoney(ctx contractapi.TransactionContextInterface, employer_id string, employee_id string) error {
// 	contract, err0 := s.ReadContract(ctx, employer_id+employee_id)
// 	employer, err1 := s.ReadUser(ctx, employer_id)
// 	employee, err2 := s.ReadUser(ctx, employee_id)

// 	if err0 != nil {
// 		return err0
// 	}

// 	if err1 != nil {
// 		return err1
// 	}

// 	if err2 != nil {
// 		return err2
// 	}

// 	salary := contract.Salary
// 	employer.Money = employer.Money - salary
// 	employee.Money = employee.Money + salary

// 	userJSON, err := json.Marshal(employer)
// 	if err != nil {
// 		return err
// 	}

// 	err = ctx.GetStub().PutState(employer_id, userJSON)
// 	if err != nil {
// 		return err
// 	}

// 	userJSON, err = json.Marshal(employee)
// 	if err != nil {
// 		return err
// 	}

// 	err = ctx.GetStub().PutState(employee_id, userJSON)
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }

// User Valid Function
func (s *SmartContract) UserValid(ctx contractapi.TransactionContextInterface, email_id string, password string) (bool, error) {
	user, err := s.ReadUser(ctx, email_id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	see := false

	if user.EmailID == email_id && user.Password == password {
		see = true
	}

	return see, nil
}

// User Exist Function
func (s *SmartContract) IsUser(ctx contractapi.TransactionContextInterface, email_id string) (bool, error) {
	userJSON, err := ctx.GetStub().GetState(email_id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return userJSON != nil, nil
}

// Contract find Function
func (s *SmartContract) IsContract(ctx contractapi.TransactionContextInterface, contract_id string) (bool, error) {
	contractJSON, err := ctx.GetStub().GetState(contract_id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return contractJSON != nil, nil
}

// GetAllAssets returns all assets found in world state
func (s *SmartContract) GetAllContracts(ctx contractapi.TransactionContextInterface) ([]string, error) {

	startKey := ""
	endKey := ""
	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	contracts := []string{}
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		contracts = append(contracts, queryResponse.Key)
	}

	return contracts, nil
}

// making contract invvalid that is terminatecontract function
func (s *SmartContract) UpdateContractStatus(ctx contractapi.TransactionContextInterface, contract_id string) error {
	contractJSON, err := s.ReadContract(ctx, contract_id)
	if err != nil {
		return fmt.Errorf("failed to read from world state: %v", err)
	}
	
	if contractJSON == nil {
		return fmt.Errorf("the contract %s does not exist", contract_id)
	}

	// overwriting original asset with new asset
	
	newcontract := Contract{
		ContractID : contractJSON.ContractID,
		EmployerEmailID : contractJSON.EmployerEmailID,
		EmployeeEmailID : contractJSON.EmployeeEmailID,
		JobTitle : contractJSON.JobTitle,
		SalaryPerDay : contractJSON.SalaryPerDay,
		Status : "false",
		StartingDate : contractJSON.StartingDate,
	}
	assetJSON, err := json.Marshal(newcontract)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(contract_id, assetJSON)
}
