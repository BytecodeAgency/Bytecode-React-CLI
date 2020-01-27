package main

import (
	"bytes"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"text/template"
)

func main() {
	flagSetupAndHandler()
}

func flagSetupAndHandler() {
	printHelp := flag.Bool("help", false, "Command usage")
	sourceDirectory := flag.String("dir", "", "Directory in which the component should be created (a subdirectory will be created)")
	componentName := flag.String("name", "", "The name of the component to be created")
	useRedux := flag.Bool("redux", false, "Connect new file to Redux")
	isReactNative := flag.Bool("native", false, "Use the templates for React Native instead of React Web")

	flag.Parse()

	if *printHelp {
		flag.PrintDefaults()
		os.Exit(0)
	}

	destDir := *sourceDirectory + "/" + *componentName

	if destDir == "" {
		log.Fatal("No destDir given, use the -dir flag to mark the destination directory (f.e. src/components), a new subfolder will be automatically created")
	}
	if *componentName == "" {
		log.Fatal("No component name given")
	}

	generateFolder(destDir)
	saveTemplateFiles(destDir, *componentName, *useRedux, *isReactNative)
}

type fileTemplate struct {
	ComponentName string
}

func generateFolder(destDir string) {
	err := os.MkdirAll(destDir, 0755)
	if err != nil {
		log.Fatal("Error creating destDir: " + err.Error())
	}
}

func generateTemplatedString(name string, templateBase string, fileTemplate fileTemplate) string {
	t := template.New(name)
	t, err := t.Parse(templateBase)
	if err != nil {
		log.Fatal("Parse template err: ", err)
	}
	tBuffer := new(bytes.Buffer)
	err = t.Execute(tBuffer, fileTemplate)
	if err != nil {
		log.Fatal("Execute template err: ", err)
	}
	return tBuffer.String()
}

func saveTemplateFiles(destDir string, componentName string, useRedux bool, isReactNative bool) {
	templateInfo := fileTemplate{ComponentName: componentName}

	if useRedux {
		mainFile := generateTemplatedString("Main", templateMainFileWithRedux, templateInfo)
		saveSingleTemplate(mainFile, destDir, componentName+".tsx")
		testFile := generateTemplatedString("Test", templateTestFileWithRedux, templateInfo)
		saveSingleTemplate(testFile, destDir, componentName+".test.tsx")
	} else {
		mainFile := generateTemplatedString("Main", templateMainFileNoRedux, templateInfo)
		saveSingleTemplate(mainFile, destDir, componentName+".tsx")
		testFile := generateTemplatedString("Test", templateTestFileNoRedux, templateInfo)
		saveSingleTemplate(testFile, destDir, componentName+".test.tsx")
	}

	if isReactNative {
		componentsFile := generateTemplatedString("Components", templateComponentsFileNative, templateInfo)
		saveSingleTemplate(componentsFile, destDir, componentName+".components.ts")
	} else {
		componentsFile := generateTemplatedString("Components", templateComponentsFileWeb, templateInfo)
		saveSingleTemplate(componentsFile, destDir, componentName+".components.ts")
	}

	typesFile := generateTemplatedString("Components", templateTypesFile, templateInfo)
	saveSingleTemplate(typesFile, destDir, componentName+".types.ts")

	handleSuccess(destDir)
}

func saveSingleTemplate(templatedString string, destDir string, fileName string) {
	destFile := destDir + "/" + fileName
	fileContents := []byte(templatedString)
	err := ioutil.WriteFile(destFile, fileContents, 0644)
	if err != nil {
		log.Fatal("Error saving file: " + err.Error())
	}
}

func handleSuccess(destDir string) {
	fmt.Println("SUCCESS: Finished writing files to the " + destDir + " directory.")
	filesInDestDir, err := ioutil.ReadDir("./" + destDir)
	if err != nil {
		log.Fatal("Error reading destDir contents: " + err.Error())
	}
	for _, f := range filesInDestDir {
		fmt.Println("  -> " + destDir + "/" + f.Name())
	}
}
