plugins {
    kotlin("jvm") version "1.8.0"
    application
}

group = "it.unibo"

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-netty:2.3.1")
    implementation("io.ktor:ktor-server-core:2.3.1")
    implementation("io.ktor:ktor-server-content-negotiation:2.3.1")
    implementation("com.google.code.gson:gson:2.8.9")
    implementation("io.ktor:ktor-client-content-negotiation:2.3.1")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.1")
    implementation("it.unibo.tuprolog:full:0.31.3")
    implementation("com.rabbitmq:amqp-client:5.9.0")
    implementation("com.google.code.gson:gson:2.8.9")
    implementation("io.ktor:ktor-server-cors-jvm:2.3.1")
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(8)
}

tasks.register<JavaExec>("run2pktService"){
    group = "2pkt Service"
    mainClass.set("it.unibo.MainKt")
    classpath = sourceSets["main"].runtimeClasspath
}