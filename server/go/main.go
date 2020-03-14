package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func indexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}
	return http.HandlerFunc(fn)
}

func main() {
	fs := http.FileServer(http.Dir("./"))
	assets := http.FileServer(http.Dir("./assets"))

	rtr := mux.NewRouter()
	rtr.PathPrefix("/assets").Handler(http.StripPrefix("/assets", assets))
	rtr.Handle("/{js:.*\\.js}", fs)
	rtr.Handle("/{css:.*\\.css}", fs)
	rtr.Handle("/{map:.*\\.map}", fs)
	rtr.PathPrefix("/").HandlerFunc(indexHandler("./index.html"))

	log.Println("Listening...")
	http.ListenAndServe(":80", rtr)

	// TODO enable TLS
	// http.ListenAndServeTLS(":8000", "cert.pem", "key.pem", rtr)
}
