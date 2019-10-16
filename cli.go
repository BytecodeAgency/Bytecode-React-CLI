package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	flagSetupAndHandler()
}

func flagSetupAndHandler () {
	printHelp := flag.Bool("help", false, "Command usage")
	fileType := flag.String("type", "cm", "file type, 'cm' for component, 'cn' for container, 'p' for page")
	useRedux := flag.Bool("redux", false, "Connect new file to Redux")

	flag.Parse()

	if *printHelp {
		flag.PrintDefaults()
		os.Exit(0)
	}

	fmt.Println(*printHelp)
	fmt.Println(*fileType)
	fmt.Println(*useRedux)
}
