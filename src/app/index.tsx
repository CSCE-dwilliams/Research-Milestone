import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Role = "guest" | "manager" | null;
type Vibe = "Dance" | "Chill" | "Sports";

type Bar = {
  name: string;
  detail: string;
  emoji: string;
};

const barsByVibe: Record<Vibe, Bar[]> = {
  Dance: [
    {
      name: "5 Points Social",
      detail: "Social night-out energy",
      emoji: "✨",
    },
    {
      name: "Rooftop Bar",
      detail: "Rooftop drinks and music",
      emoji: "🌃",
    },
  ],
  Chill: [
    {
      name: "Bang Back Pinball Lounge",
      detail: "Games and a relaxed vibe",
      emoji: "🕹️",
    },
    {
      name: "CJ's",
      detail: "Neighborhood-bar atmosphere",
      emoji: "🍻",
    },
  ],
  Sports: [
    {
      name: "Touchdowns",
      detail: "Game-day drinks and food",
      emoji: "🏈",
    },
    {
      name: "5 Points Saloon",
      detail: "Casual Five Points stop",
      emoji: "🤠",
    },
  ],
};

export default function Index() {
  const [role, setRole] = useState<Role>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);
  const [addedToPlan, setAddedToPlan] = useState(false);

  const [managerName, setManagerName] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueType, setVenueType] = useState("");
  const [profileSubmitted, setProfileSubmitted] = useState(false);

  function resetApp() {
    setRole(null);
    setVibe(null);
    setSelectedBar(null);
    setAddedToPlan(false);
    setProfileSubmitted(false);
  }

  if (role === null) {
    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.topGlow} />
        <View style={styles.roleScreen}>
          <Text style={styles.logo}>BarCast</Text>
          <Text style={styles.liveBadge}>● LIVE</Text>

          <Text style={styles.title}>Welcome to BarCast</Text>
          <Text style={styles.subtitle}>
            Five Points, Columbia SC — made for planning your night out.
          </Text>

          <Pressable style={styles.roleCard} onPress={() => setRole("guest")}>
            <Text style={styles.roleEmoji}>🎉</Text>
            <View style={styles.roleText}>
              <Text style={styles.roleTitle}>I’m going out tonight</Text>
              <Text style={styles.roleDescription}>
                Find a bar that matches your vibe and add it to your plan.
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable style={styles.roleCard} onPress={() => setRole("manager")}>
            <Text style={styles.roleEmoji}>🏢</Text>
            <View style={styles.roleText}>
              <Text style={styles.roleTitle}>I manage a venue</Text>
              <Text style={styles.roleDescription}>
                Enter your venue’s permanent profile information.
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Text style={styles.note}>
            Demo role selection — this is not a real login yet.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (role === "manager") {
    return (
      <SafeAreaView style={styles.page}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.logo}>BarCast</Text>
          <Text style={styles.liveBadge}>VENUE MANAGER</Text>

          <Text style={styles.title}>Venue profile</Text>
          <Text style={styles.subtitle}>
            Managers enter information about their venue. Patrons use that
            information when planning their night.
          </Text>

          {!profileSubmitted ? (
            <View style={styles.formCard}>
              <Text style={styles.label}>Manager name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#78909C"
                value={managerName}
                onChangeText={setManagerName}
              />

              <Text style={styles.label}>Venue name</Text>
              <TextInput
                style={styles.input}
                placeholder="Example: My Five Points Bar"
                placeholderTextColor="#78909C"
                value={venueName}
                onChangeText={setVenueName}
              />

              <Text style={styles.label}>Address or neighborhood</Text>
              <TextInput
                style={styles.input}
                placeholder="Example: 620 Harden Street"
                placeholderTextColor="#78909C"
                value={venueAddress}
                onChangeText={setVenueAddress}
              />

              <Text style={styles.label}>Venue type</Text>
              <TextInput
                style={styles.input}
                placeholder="Example: Sports bar, lounge, rooftop"
                placeholderTextColor="#78909C"
                value={venueType}
                onChangeText={setVenueType}
              />

              <Pressable
                style={styles.primaryButton}
                onPress={() => setProfileSubmitted(true)}
              >
                <Text style={styles.primaryButtonText}>Save Venue Profile</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.successCard}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successTitle}>Venue profile saved!</Text>
              <Text style={styles.successText}>
                {venueName || "Your venue"} is ready to appear in BarCast.
              </Text>
            </View>
          )}

          <Pressable style={styles.backButton} onPress={resetApp}>
            <Text style={styles.backButtonText}>← Back to role selection</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.logo}>BarCast</Text>
        <Text style={styles.liveBadge}>● LIVE</Text>

        <Text style={styles.location}>Five Points, Columbia SC</Text>
        <Text style={styles.title}>What’s your vibe tonight?</Text>
        <Text style={styles.subtitle}>
          Choose a mood to see Five Points places that fit your night.
        </Text>

        <View style={styles.vibeRow}>
          {(["Dance", "Chill", "Sports"] as Vibe[]).map((item) => (
            <Pressable
              key={item}
              style={[
                styles.vibeButton,
                vibe === item && styles.vibeButtonSelected,
              ]}
              onPress={() => {
                setVibe(item);
                setSelectedBar(null);
                setAddedToPlan(false);
              }}
            >
              <Text style={styles.vibeEmoji}>
                {item === "Dance" ? "🪩" : item === "Chill" ? "🌙" : "🏈"}
              </Text>
              <Text
                style={[
                  styles.vibeText,
                  vibe === item && styles.vibeTextSelected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {vibe && (
          <>
            <Text style={styles.sectionTitle}>Places for a {vibe} vibe</Text>

            {barsByVibe[vibe].map((bar) => (
              <Pressable
                key={bar.name}
                style={[
                  styles.barCard,
                  selectedBar?.name === bar.name && styles.barCardSelected,
                ]}
                onPress={() => {
                  setSelectedBar(bar);
                  setAddedToPlan(false);
                }}
              >
                <Text style={styles.barEmoji}>{bar.emoji}</Text>
                <View style={styles.barInfo}>
                  <Text style={styles.barName}>{bar.name}</Text>
                  <Text style={styles.barDetail}>{bar.detail}</Text>
                  <Text style={styles.barLocation}>
                    Five Points, Columbia SC
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </Pressable>
            ))}
          </>
        )}

        {selectedBar && !addedToPlan && (
          <Pressable
            style={styles.primaryButton}
            onPress={() => setAddedToPlan(true)}
          >
            <Text style={styles.primaryButtonText}>
              Add {selectedBar.name} to My Plan
            </Text>
          </Pressable>
        )}

        {addedToPlan && selectedBar && (
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>Added to My Plan!</Text>
            <Text style={styles.successText}>
              {selectedBar.name} is now part of your night-out plan.
            </Text>
          </View>
        )}

        <Pressable style={styles.backButton} onPress={resetApp}>
          <Text style={styles.backButtonText}>← Back to role selection</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#030B0F",
  },
  topGlow: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#063442",
    opacity: 0.65,
  },
  roleScreen: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  scroll: {
    padding: 24,
    paddingBottom: 44,
  },
  logo: {
    color: "#00C6D7",
    fontSize: 31,
    fontWeight: "800",
    marginTop: 10,
  },
  liveBadge: {
    alignSelf: "flex-start",
    color: "#FF715B",
    backgroundColor: "#351718",
    borderRadius: 12,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 7,
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  location: {
    color: "#00AFC3",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 24,
  },
  title: {
    color: "#F4F7F8",
    fontSize: 29,
    fontWeight: "800",
    lineHeight: 35,
    marginTop: 14,
  },
  subtitle: {
    color: "#A7C0C8",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
    marginBottom: 25,
  },
  roleCard: {
    alignItems: "center",
    backgroundColor: "#06202B",
    borderColor: "#0A3543",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 13,
    padding: 18,
  },
  roleEmoji: {
    fontSize: 31,
    marginRight: 14,
  },
  roleText: {
    flex: 1,
  },
  roleTitle: {
    color: "#F4F7F8",
    fontSize: 17,
    fontWeight: "800",
  },
  roleDescription: {
    color: "#9CB7C0",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  arrow: {
    color: "#00C6D7",
    fontSize: 28,
    marginLeft: 10,
  },
  note: {
    color: "#6D8992",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 24,
    textAlign: "center",
  },
  vibeRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 29,
  },
  vibeButton: {
    alignItems: "center",
    backgroundColor: "#06202B",
    borderColor: "#0A3543",
    borderRadius: 15,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 13,
  },
  vibeButtonSelected: {
    backgroundColor: "#003C49",
    borderColor: "#00C6D7",
  },
  vibeEmoji: {
    fontSize: 23,
  },
  vibeText: {
    color: "#A7C0C8",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },
  vibeTextSelected: {
    color: "#F4F7F8",
  },
  sectionTitle: {
    color: "#F4F7F8",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  barCard: {
    alignItems: "center",
    backgroundColor: "#06202B",
    borderColor: "#0A3543",
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 11,
    padding: 15,
  },
  barCardSelected: {
    borderColor: "#00C6D7",
    borderWidth: 2,
  },
  barEmoji: {
    fontSize: 28,
    marginRight: 13,
  },
  barInfo: {
    flex: 1,
  },
  barName: {
    color: "#F4F7F8",
    fontSize: 16,
    fontWeight: "800",
  },
  barDetail: {
    color: "#A7C0C8",
    fontSize: 13,
    marginTop: 3,
  },
  barLocation: {
    color: "#00AFC3",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5,
  },
  formCard: {
    backgroundColor: "#06202B",
    borderColor: "#0A3543",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  label: {
    color: "#D6E7EB",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#03151D",
    borderColor: "#164A58",
    borderRadius: 12,
    borderWidth: 1,
    color: "#F4F7F8",
    fontSize: 15,
    padding: 13,
  },
  primaryButton: {
    backgroundColor: "#00AFC3",
    borderRadius: 15,
    marginTop: 22,
    padding: 16,
  },
  primaryButtonText: {
    color: "#00181E",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },
  successCard: {
    alignItems: "center",
    backgroundColor: "#053328",
    borderColor: "#0B8063",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 18,
    padding: 22,
  },
  successIcon: {
    color: "#48E3A5",
    fontSize: 31,
    fontWeight: "900",
  },
  successTitle: {
    color: "#E2FFF3",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 5,
  },
  successText: {
    color: "#B4E4D3",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    textAlign: "center",
  },
  backButton: {
    marginTop: 28,
    padding: 10,
  },
  backButtonText: {
    color: "#00C6D7",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
});
