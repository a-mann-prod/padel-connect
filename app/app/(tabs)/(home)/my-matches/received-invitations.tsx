export default () => {
  return <></>

  //   const {
  //     data: invitationPages,
  //     isLoading,
  //     isRefetching,
  //     refetch,
  //     fetchNextPage,
  //     hasNextPage,
  //     isFetchingNextPage,
  //   } = useInfiniteInvitations()

  //   const invitations = invitationPages?.pages.reduce<
  //     ProfilesResponse['results']
  //   >((prev, acc) => [...prev, ...acc.results], [])

  //   const renderItem = ({
  //     item,
  //   }: ListRenderItemInfo<ProfilesResponse['results'][number]>) => (
  //     <PlayerListItem
  //       {...item}
  //       onSelectButtonPress={
  //         onSelectButtonPress ? () => onSelectButtonPress(item.id) : undefined
  //       }
  //       onPress={onPress ? () => onPress(item.id) : undefined}
  //       isSelected={selectedUserIds?.includes(item.id)}
  //       isSelectDisabled={isSelectDisabled(item.id)}
  //       isDisabled={disabledUserIds.includes(item.id)}
  //     />
  //   )

  //   return (
  //     <VStack gap="$3" flex={1}>
  //       <VirtualizedList<ProfilesResponse['results'][number]>
  //         data={invitations}
  //         getItem={(data, index) => data[index]}
  //         getItemCount={(data) => data.length}
  //         keyExtractor={(item) => item.id.toString()}
  //         renderItem={renderItem}
  //         isLoading={isLoading}
  //         refreshing={isRefetching}
  //         onRefresh={refetch}
  //         onEndReached={() => hasNextPage && fetchNextPage()}
  //         isLoadingNext={isFetchingNextPage}
  //       />
  //     </VStack>
  //   )
}
