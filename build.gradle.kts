plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.ktor)
    kotlin("plugin.serialization") version "1.9.0"
}

group = "com.github.berkeleysquare"
version = "0.0.1"

application {
    mainClass = "io.ktor.server.netty.EngineMain"
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=true")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.ktor.server.core)
    implementation(libs.ktor.server.netty)
    implementation(libs.logback.classic)
    implementation(libs.ktor.server.core)
    implementation(libs.ktor.server.config.yaml)
    implementation("io.ktor:ktor-server-content-negotiation:2.3.9")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.9")
    implementation("com.google.code.gson:gson:2.10.1")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
    testImplementation(libs.ktor.server.test.host)
    testImplementation(libs.kotlin.test.junit)
}

// Kindler tasks
tasks.register<Exec>("buildKindlerReact") {
    group = "build"
    description = "Builds the Kindler React app"
    workingDir = file("kindler")
    commandLine = listOf("yarn", "build")
}
tasks.register<Copy>("copyKindlerReact") {
    group = "build"
    description = "Copies Kindler React build"
    dependsOn("buildKindlerReact")
    from("kindler/build")
    into("$buildDir/resources/main/kindler")
}
tasks.register<Delete>("cleanKindlerResources") {
    group = "build"
    description = "Cleans Kindler resources"
    delete(file("src/main/resources/kindler"))
}
tasks.named("copyKindlerReact") {
    dependsOn("cleanKindlerResources", "buildKindlerReact")
}

// Manager tasks
tasks.register<Exec>("buildManagerReact") {
    group = "build"
    description = "Builds the Manager React app"
    workingDir = file("manager")
    commandLine = listOf("yarn", "build")
}
tasks.register<Copy>("copyManagerReact") {
    group = "build"
    description = "Copies Manager React build"
    dependsOn("buildManagerReact")
    from("manager/dist")
    into("$buildDir/resources/main/manager")
}
tasks.register<Delete>("cleanManagerResources") {
    group = "build"
    description = "Cleans Manager resources"
    delete(file("src/main/resources/manager"))
}
tasks.named("copyManagerReact") {
    dependsOn("cleanManagerResources", "buildManagerReact")
}

// Make build/jar/shadowJar depend on both
tasks.named("build") {
    dependsOn("copyKindlerReact", "copyManagerReact")
}
tasks.named("jar") {
    dependsOn("copyKindlerReact", "copyManagerReact")
}
tasks.named("shadowJar") {
    dependsOn("copyKindlerReact", "copyManagerReact")
}
