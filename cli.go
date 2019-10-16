package main

import (
	"bytes"
	"flag"
	"fmt"
	"log"
	"os"
	"text/template"
)

func main() {
	flagSetupAndHandler()
}

func flagSetupAndHandler () {
	printHelp := flag.Bool("help", false, "Command usage")
	sourceDirectory := flag.String("dir", "src", "Directory in which the component should be created (a subdirectory will be created)")
	componentName := flag.String("name", "TestComponent", "The name of the component to be created")
	useRedux := flag.Bool("redux", false, "Connect new file to Redux")

	flag.Parse()

	if *printHelp {
		flag.PrintDefaults()
		os.Exit(0)
	}

	saveTemplateFiles(*sourceDirectory, *componentName, *useRedux)
}

type fileTemplate struct {
	ComponentName string
}

func generateTemplatedString (name string, templateBase string, fileTemplate fileTemplate) string {
	t := template.New(name)
	t, err := t.Parse(templateBase)
	if err != nil {
		log.Fatal("Parse: ", err)
	}
	tBuffer := new(bytes.Buffer)
	err = t.Execute(tBuffer, fileTemplate)
	if err != nil {
		log.Fatal("Execute: ", err)
	}
	return tBuffer.String()
}

func saveTemplateFiles (sourceDirectory string, componentName string, useRedux bool) {
	templateInfo := fileTemplate{ComponentName: componentName}

	if useRedux {
		mainFile := generateTemplatedString("Main", templateMainFileWithRedux, templateInfo)
		testFile := generateTemplatedString("Test", templateTestFileWithRedux, templateInfo)
		fmt.Println(mainFile)
		fmt.Println(testFile)
	} else {
		mainFile := generateTemplatedString("Main", templateMainFileNoRedux, templateInfo)
		testFile := generateTemplatedString("Test", templateTestFileNoRedux, templateInfo)
		fmt.Println(mainFile)
		fmt.Println(testFile)
	}

	componentsFile := generateTemplatedString("Components", templateComponentsFile, templateInfo)
	fmt.Println(componentsFile)

	typesFile := generateTemplatedString("Components", templateTypesFile, templateInfo)
	fmt.Println(typesFile)

	fmt.Println(sourceDirectory)
	fmt.Println(componentName)
	fmt.Println(useRedux)
}

//func saveSingleTemplate (templatedString string, fileDest string) {
//
//}
