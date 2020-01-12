// default settings. fis3 release
fis.match("*.less", {
  "parser": fis.plugin("less"),
  "rExt": ".css"
});
fis.match("/(**)", {
      "release": "/$1"
  })
  .match("/(*.{less})", {
      "useDomain": true,
      "isCssLike": true,
      "useCompile": true,
      "useCache": false,
      "useHash": false,
      "useMap": false,
      "release": "/$1"
  })
  .match("/**.md", {
      "release": false
  })
  .match("/package.json", {
      "release": false
  })
  .match("/**.md", {
      "release": false
  });



fis.set(
  "project.ignore", [".git/**", 'node_modules/**', "release/**", "fis-conf.js", "dist/**"]
);