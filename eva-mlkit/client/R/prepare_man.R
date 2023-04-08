library(Rd2md)
files <- c(
           "eva.session.Rd",
           "eva.authenticate.Rd",
           "eva.call.Rd",
           "eva.credentials.Rd",
           "eva.test.Rd",
           "eva.history.request.Rd",
           "eva.history.append_oid.Rd",
           "eva.history.fetch.Rd",
           "eva.history.push.Rd"
)
append <- FALSE
for (f in files) {
  input <- paste("/opt/eva-ics-ml-R/man", f, sep="/")
  Rd2markdown(input, 'man.md', append=append)
  if (isFALSE(append)) append <- TRUE
}
